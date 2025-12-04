const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  console.log('🔑 Auth middleware called');
  
  // Support both x-auth-token header and Authorization: Bearer <token>
  const token = req.header('x-auth-token') || 
                (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

  if (!token) {
    console.log('❌ No token found');
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    console.log('🔍 Verifying JWT token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified successfully');
    
    // Handle both token formats (direct user object or nested user.id)
    req.user = decoded.user || decoded;
    next();
  } catch (err) {
    console.error('❌ JWT verification error:', err.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;
