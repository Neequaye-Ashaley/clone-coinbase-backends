const mongoose = require('mongoose');

// Database configurations
const LOCAL_DB_URI = 'mongodb://localhost:27017/coinbase-clone';
const ONLINE_DB_URI = 'mongodb+srv://solomonnee02:LJUvVUIpqGFHFAkY@cluster0.ro5xa0w.mongodb.net/coinbase-cloned-db?appName=Cluster0s';

// Import models after connection
let User, Crypto;

const migrateDatabase = async () => {
  try {
    console.log('🔄 Starting database migration...\n');

    // Connect to local database
    console.log('📡 Connecting to local database...');
    await mongoose.connect(LOCAL_DB_URI);
    console.log('✅ Connected to local database');
    
    // Import models from local connection
    User = require('./models/User');
    Crypto = require('./models/Crypto');
    
    // Get data from local database
    const localUsers = await User.find();
    const localCryptos = await Crypto.find();
    
    console.log(`📊 Found ${localUsers.length} users and ${localCryptos.length} cryptocurrencies in local DB\n`);
    
    // Disconnect from local database
    await mongoose.disconnect();
    console.log('🔌 Disconnected from local database');

    // Connect to online database
    console.log('\n📡 Connecting to online database...');
    await mongoose.connect(ONLINE_DB_URI);
    console.log('✅ Connected to online database');
    
    // Import models for online connection
    User = require('./models/User');
    Crypto = require('./models/Crypto');
    
    // Clear existing data in online database (optional - remove if you want to keep existing data)
    console.log('\n🧹 Clearing existing data in online database...');
    await User.deleteMany({});
    await Crypto.deleteMany({});
    console.log('✅ Cleared existing data');

    // Migrate users
    console.log('\n👥 Migrating users...');
    if (localUsers.length > 0) {
      await User.insertMany(localUsers);
      console.log(`✅ Migrated ${localUsers.length} users`);
      
      // Display migrated users
      localUsers.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`);
      });
    } else {
      console.log('ℹ️  No users found to migrate');
    }

    // Migrate cryptocurrencies
    console.log('\n💰 Migrating cryptocurrencies...');
    if (localCryptos.length > 0) {
      await Crypto.insertMany(localCryptos);
      console.log(`✅ Migrated ${localCryptos.length} cryptocurrencies`);
      
      // Display migrated cryptocurrencies
      localCryptos.forEach(crypto => {
        console.log(`   - ${crypto.name} (${crypto.symbol}): $${crypto.price}`);
      });
    } else {
      console.log('ℹ️  No cryptocurrencies found to migrate');
    }

    // Verify migration
    console.log('\n🔍 Verifying migration...');
    const migratedUsers = await User.countDocuments();
    const migratedCryptos = await Crypto.countDocuments();
    
    console.log(`✅ Verification complete:`);
    console.log(`   - Users: ${migratedUsers}/${localUsers.length}`);
    console.log(`   - Cryptocurrencies: ${migratedCryptos}/${localCryptos.length}`);

    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from online database');
    
    console.log('\n🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
    
    // Ensure disconnection on error
    try {
      await mongoose.disconnect();
    } catch (disconnectError) {
      console.error('Error during disconnection:', disconnectError.message);
    }
    
    process.exit(1);
  }
};

// Run migration
migrateDatabase();
