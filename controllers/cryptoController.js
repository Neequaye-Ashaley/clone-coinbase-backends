const Crypto = require('../models/Crypto');

// Get all cryptocurrencies
const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json({
      message: 'Cryptocurrencies retrieved successfully',
      cryptos
    });
  } catch (error) {
    console.error('Error fetching cryptos:', error);
    res.status(500).json({ 
      message: 'Server error while fetching cryptocurrencies',
      error: error.message 
    });
  }
};

// Get top gainers
const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find()
      .sort({ change24h: -1 })
      .limit(10);
    
    res.json({
      message: 'Top gainers retrieved successfully',
      gainers
    });
  } catch (error) {
    console.error('Error fetching gainers:', error);
    res.status(500).json({ 
      message: 'Server error while fetching top gainers',
      error: error.message 
    });
  }
};

// Get new listings
const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find()
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      message: 'New listings retrieved successfully',
      newListings
    });
  } catch (error) {
    console.error('Error fetching new listings:', error);
    res.status(500).json({ 
      message: 'Server error while fetching new listings',
      error: error.message 
    });
  }
};

// Add new cryptocurrency (protected)
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validate input
    if (!name || !symbol || !price || !image) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: name, symbol, price, image' 
      });
    }

    // Check if crypto already exists
    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(400).json({ 
        message: 'Cryptocurrency with this symbol already exists' 
      });
    }

    // Create new cryptocurrency
    const crypto = new Crypto({
      name,
      symbol: symbol.toUpperCase(),
      price,
      image,
      change24h: change24h || 0
    });

    await crypto.save();

    res.status(201).json({
      message: 'Cryptocurrency added successfully',
      crypto
    });
  } catch (error) {
    console.error('Error adding crypto:', error);
    res.status(500).json({ 
      message: 'Server error while adding cryptocurrency',
      error: error.message 
    });
  }
};

// Get single cryptocurrency by ID
const getCryptoById = async (req, res) => {
  try {
    const crypto = await Crypto.findById(req.params.id);
    
    if (!crypto) {
      return res.status(404).json({ message: 'Cryptocurrency not found' });
    }

    res.json({
      message: 'Cryptocurrency retrieved successfully',
      crypto
    });
  } catch (error) {
    console.error('Error fetching crypto:', error);
    res.status(500).json({ 
      message: 'Server error while fetching cryptocurrency',
      error: error.message 
    });
  }
};

module.exports = {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
  getCryptoById
};
