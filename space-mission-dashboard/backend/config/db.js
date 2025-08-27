const mongoose = require('mongoose');

module.exports = async function connectDB(uri) {
  try {
    // silence deprecation warnings for older Mongoose options
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};