const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://glittering-cactus-65b9d8.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Coinbase Clone API Server is running!' });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then setup routes
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // Now require routes after connection is established
    const authRoutes = require('./routes/auth');
    const cryptoRoutes = require('./routes/crypto');

    app.use('/api/auth', authRoutes);
    app.use('/api/crypto', cryptoRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log('📡 API endpoints ready:');
      console.log('   - POST /api/auth/register');
      console.log('   - POST /api/auth/login');
      console.log('   - GET  /api/auth/profile');
      console.log('   - GET  /api/crypto');
      console.log('   - GET  /api/crypto/gainers');
      console.log('   - GET  /api/crypto/new');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.error('   Please check your MONGODB_URI in .env file');
    process.exit(1);
  });
