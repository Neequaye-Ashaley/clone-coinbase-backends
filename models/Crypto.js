const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cryptocurrency name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  symbol: {
    type: String,
    required: [true, 'Symbol is required'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [10, 'Symbol cannot exceed 10 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  change24h: {
    type: Number,
    required: [true, '24h change is required'],
    default: 0
  },
  marketCap: {
    type: Number,
    default: 0,
    min: [0, 'Market cap cannot be negative']
  },
  volume24h: {
    type: Number,
    default: 0,
    min: [0, 'Volume cannot be negative']
  },
  circulatingSupply: {
    type: Number,
    default: 0,
    min: [0, 'Circulating supply cannot be negative']
  },
  change7d: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
cryptoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
cryptoSchema.index({ createdAt: -1 });
cryptoSchema.index({ change24h: -1 });

module.exports = mongoose.model('Crypto', cryptoSchema);
