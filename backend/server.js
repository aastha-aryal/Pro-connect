require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/service-providers', require('./routes/serviceProvider'));

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Pro Connect Backend API ✅',
    endpoints: {
      customers: '/api/auth (login, register, me)',
      serviceProviders: '/api/service-providers (login, register, me, ping)'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Pro Connect Backend running on http://localhost:${PORT}`);
});
