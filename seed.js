const mongoose = require('mongoose');
const Crypto = require('./models/Crypto');
require('dotenv').config();

const seedCryptos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing cryptos
    await Crypto.deleteMany({});
    console.log('Cleared existing cryptos');

    // Sample cryptocurrencies
    const cryptos = [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 67542.32,
        change24h: 2.34,
        change7d: 5.67,
        marketCap: 1324000000000,
        volume24h: 28500000000,
        circulatingSupply: 19600000,
        image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        description: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator.'
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        price: 3456.78,
        change24h: 1.89,
        change7d: 4.23,
        marketCap: 415000000000,
        volume24h: 15200000000,
        circulatingSupply: 120200000,
        image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality.'
      },
      {
        name: 'Solana',
        symbol: 'SOL',
        price: 178.45,
        change24h: -1.23,
        change7d: 8.92,
        marketCap: 82000000000,
        volume24h: 4100000000,
        circulatingSupply: 460000000,
        image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
        description: 'Solana is a high-performance blockchain supporting builders around the world.'
      },
      {
        name: 'Cardano',
        symbol: 'ADA',
        price: 0.45,
        change24h: 3.21,
        change7d: -2.15,
        marketCap: 16000000000,
        volume24h: 890000000,
        circulatingSupply: 35600000000,
        image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
        description: 'Cardano is a proof-of-stake blockchain platform that says its goal is to allow "changemakers, innovators and visionaries" to bring about positive global change.'
      },
      {
        name: 'XRP',
        symbol: 'XRP',
        price: 0.52,
        change24h: 0.87,
        change7d: 2.34,
        marketCap: 28000000000,
        volume24h: 1200000000,
        circulatingSupply: 54000000000,
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
        description: 'XRP is the native cryptocurrency of the XRP Ledger, an open-source, permissionless and decentralized blockchain technology.'
      },
      {
        name: 'Dogecoin',
        symbol: 'DOGE',
        price: 0.12,
        change24h: 5.67,
        change7d: 12.34,
        marketCap: 17000000000,
        volume24h: 1800000000,
        circulatingSupply: 142000000000,
        image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
        description: 'Dogecoin is an open-source, peer-to-peer cryptocurrency that leverages blockchain technology.'
      }
    ];

    await Crypto.insertMany(cryptos);
    console.log('Sample cryptocurrencies seeded successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedCryptos();
