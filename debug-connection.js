const mongoose = require('mongoose');

const ONLINE_DB_URI = 'mongodb+srv://solomonnee02:LJUvVUIpqGFHFAkY@cluster0.ro5xa0w.mongodb.net/coinbase-cloned-db?appName=Cluster0s';

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...\n');

    // Test connection with updated options
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('📡 Attempting to connect...');
    console.log(`   URI: ${ONLINE_DB_URI.replace(/:([^@]+)@/, ':***@')}`); // Hide password

    const startTime = Date.now();
    await mongoose.connect(ONLINE_DB_URI, options);
    const endTime = Date.now();

    console.log(`✅ Connected successfully in ${endTime - startTime}ms`);

    // Test database operations
    console.log('\n🧪 Testing database operations...');

    const User = require('./models/User');
    const Crypto = require('./models/Crypto');

    // Test read operations
    const userCount = await User.countDocuments();
    const cryptoCount = await Crypto.countDocuments();

    console.log(`   Users found: ${userCount}`);
    console.log(`   Cryptocurrencies found: ${cryptoCount}`);

    // Test a simple query
    const sampleCrypto = await Crypto.findOne();
    if (sampleCrypto) {
      console.log(`   Sample crypto: ${sampleCrypto.name} - $${sampleCrypto.price}`);
    }

    await mongoose.disconnect();
    console.log('\n✅ All tests passed!');

  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(`   Error: ${error.message}`);

    // Specific error handling
    if (error.name === 'MongoNetworkError') {
      console.error('   Network issue - check internet connection or firewall');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('   Server selection failed - check cluster status');
    } else if (error.message.includes('authentication')) {
      console.error('   Authentication failed - check username/password');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('   DNS resolution failed - check cluster name');
    }

    // Ensure disconnection
    try {
      await mongoose.disconnect();
    } catch (disconnectError) {
      // Ignore disconnect errors
    }

    process.exit(1);
  }
};

testConnection();
