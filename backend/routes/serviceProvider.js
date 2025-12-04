const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ServiceProvider = require('../models/ServiceProvider');
const auth = require('../middleware/auth');
const { performOCR } = require('../utils/ocr');

const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`✅ Folder created: ${folderPath}`);
  }
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = {
    cv: ['application/pdf', 'image/jpeg', 'image/jpg'],
    id: ['image/jpeg', 'image/png', 'image/jpg'],
    profile: ['image/jpeg', 'image/png', 'image/jpg'],
    portfolio: ['image/jpeg', 'image/png', 'image/jpg'],
  };

  const limits = {
    cv: 5 * 1024 * 1024,
    id: 3 * 1024 * 1024,
    profile: 2 * 1024 * 1024,
    portfolio: 3 * 1024 * 1024,
  };

  if (!allowed[file.fieldname]) return cb(new Error('Unknown file field'), false);

  if (!allowed[file.fieldname].includes(file.mimetype))
    return cb(new Error(`${file.fieldname} must be ${allowed[file.fieldname].join('/')}`), false);

  if (file.size > limits[file.fieldname]) return cb(new Error(`${file.fieldname} exceeds size limit`), false);

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

// Ping route
router.get('/ping', (req, res) => {
  console.log('Ping received ✅');
  res.send('pong ✅');
});

// SERVICE PROVIDER REGISTER
router.post(
  '/register',
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'id', maxCount: 1 },
    { name: 'profile', maxCount: 1 },
    { name: 'portfolio', maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      console.log('📝 Service Provider Register endpoint called');
      const files = req.files || {};
      const body = req.body;

      const {
        'Full Name': fullName,
        Email,
        Phone,
        Password,
        'Confirm Password': confirmPassword,
        'Service Category': serviceCategory,
        'Skills/Service Offered': skills,
        'Years of Experience': yearsOfExperience,
        'Short Bio': shortBio,
        Province,
        'City / Municipality': city,
        'ID Type': idType,
        'Ward No': wardNo,
      } = body;

      if (!fullName || !Email || !Phone || !Password || !confirmPassword) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (Password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match' });
      if (!serviceCategory || !skills || !yearsOfExperience)
        return res.status(400).json({ error: 'Profile fields required' });
      if (!Province || !city || !idType)
        return res.status(400).json({ error: 'Location/ID fields required' });

      const experience = Number(yearsOfExperience);
      if (isNaN(experience) || experience < 0) return res.status(400).json({ error: 'Invalid years of experience' });

      let parsedSkills = typeof skills === 'string' ? JSON.parse(skills || '[]') : skills;

      if (!files.cv || !files.id) return res.status(400).json({ error: 'CV and ID are required' });

      const existing = await ServiceProvider.findOne({ email: Email });
      if (existing) return res.status(400).json({ error: 'Email already registered' });

      const hashedPassword = await bcrypt.hash(Password, 10);
      const uploadBaseDir = path.join(process.cwd(), 'backend/uploads');

      const saveFile = (file, folder) => {
        const dir = path.join(uploadBaseDir, folder);
        ensureFolderExists(dir);
        const fileName = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
        const fullPath = path.join(dir, fileName);
        fs.writeFileSync(fullPath, file.buffer);
        console.log(`✅ Saved ${folder}: ${fullPath}`);
        return fullPath;
      };

      const cvPath = saveFile(files.cv[0], 'cv');
      const idPath = saveFile(files.id[0], 'id');
      const profilePath = files.profile ? saveFile(files.profile[0], 'profile') : '';
      const portfolioPaths = files.portfolio ? files.portfolio.map((f) => saveFile(f, 'portfolio')) : [];

      const ocrText = await performOCR(idPath);

      const sp = new ServiceProvider({
        name: fullName,
        email: Email,
        phone: Phone,
        password: hashedPassword,
        province: Province,
        city,
        wardNo,
        shortBio: shortBio || '',
        services: parsedSkills,
        serviceCategory,
        yearsOfExperience: experience,
        idType,
        cvDocument: cvPath,
        idDocument: idPath,
        profilePic: profilePath,
        portfolio: portfolioPaths,
        idTextOCR: ocrText,
      });

      await sp.save();
      res.json({ message: 'Service provider registered successfully!', ocrText });
    } catch (err) {
      console.error('❌ Register error:', err.message, err.stack);
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
);

// SERVICE PROVIDER LOGIN
router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) return res.status(400).json({ error: 'Email and password required' });

    const user = await ServiceProvider.findOne({ email: Email });
    if (!user) return res.status(400).json({ error: 'Email not registered' });

    const isMatch = await bcrypt.compare(Password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });
    
    console.log('✅ JWT token generated successfully');
    res.json({ message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get service provider profile (protected)
router.get('/me', auth, async (req, res) => {
  try {
    console.log('📋 /me endpoint called by user:', req.user.id);
    const user = await ServiceProvider.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    console.log('✅ User profile retrieved:', user.email);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// File view endpoint (Browser-viewable)
router.get('/file/:userId/:fileType', auth, async (req, res) => {
  try {
    const { userId, fileType } = req.params;

    if (req.user.id !== userId)
      return res.status(403).json({ error: 'Access denied' });

    const user = await ServiceProvider.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const fileMap = {
      cv: { path: user.cvDocument, type: 'application/pdf' },
      id: { path: user.idDocument, type: 'image/jpeg' },
      profile: { path: user.profilePic, type: 'image/jpeg' },
    };

    const fileInfo = fileMap[fileType];
    if (!fileInfo || !fileInfo.path)
      return res.status(404).json({ error: 'File not found' });

    const absolutePath = path.resolve(fileInfo.path.replace(/\\/g, '/'));
    if (!fs.existsSync(absolutePath))
      return res.status(404).json({ error: 'File not found on server' });

    console.log(`✅ Sending file: ${absolutePath}`);

    res.sendFile(path.basename(absolutePath), { root: path.dirname(absolutePath) }, (err) => {
      if (err) {
        console.error('❌ sendFile error:', err);
        res.status(500).json({ error: 'Failed to send file', details: err.message });
      }
    });
  } catch (err) {
    console.error('❌ File view error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
