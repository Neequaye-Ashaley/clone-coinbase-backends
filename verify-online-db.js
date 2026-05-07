const mongoose = require('mongoose');

const ONLINE_DB_URI = 'mongodb+srv://solomonnee02:LJUvVUIpqGFHFAkY@cluster0.ro5xa0w.mongodb.net/coinbase-cloned-db?appName=Cluster0s';

const verifyOnlineDatabase = async () => {
  try {
    console.log('🔍 Verifying online database...\n');
    
    // Connect to online database
    await mongoose.connect(ONLINE_DB_URI);
    console.log('✅ Connected to online database');
    
    // Import models
    const User = require('./models/User');
    const Crypto = require('./models/Crypto');
    
    // Check data
    const userCount = await User.countDocuments();
    const cryptoCount = await Crypto.countDocuments();
    
    console.log(`\n📊 Database contents:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Cryptocurrencies: ${cryptoCount}`);
    
    // Show sample data
    if (cryptoCount > 0) {
      console.log('\n💰 Sample cryptocurrencies:');
      const cryptos = await Crypto.find().limit(3);
      cryptos.forEach(crypto => {
        console.log(`   - ${crypto.name} (${crypto.symbol}): $${crypto.price} (${crypto.change24h}%)`);
      });
    }
    
    if (userCount > 0) {
      console.log('\n👥 Sample users:');
      const users = await User.find().limit(2);
      users.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`);
      });
    }
    
    await mongoose.disconnect();
    console.log('\n✅ Verification complete!');
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
};

verifyOnlineDatabase();
