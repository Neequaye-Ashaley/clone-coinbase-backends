const express = require('express');
const router = express.Router();
const { 
  getAllCryptos, 
  getTopGainers, 
  getNewListings, 
  addCrypto, 
  getCryptoById 
} = require('../controllers/cryptoController');
const auth = require('../middleware/auth');

// Get all cryptocurrencies
router.get('/', getAllCryptos);

// Get top gainers
router.get('/gainers', getTopGainers);

// Get new listings
router.get('/new', getNewListings);

// Add new cryptocurrency (protected)
router.post('/', auth, addCrypto);

// Get single cryptocurrency by ID
router.get('/:id', getCryptoById);

module.exports = router;
