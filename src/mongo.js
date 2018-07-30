// Connect to DB via Mongoose
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://mongodb:27017/wall',
  {
    useNewUrlParser: true,
    replicaSet: process.env.MONGODB_REPLICA_SET || null,
    ssl: process.env.MONGODB_SSL || false,
    retryWrites: process.env.MONGODB_RETRY_WRITES || true,
    authSource: process.env.MONGODB_AUTH_SOURCE || 'admin'
  }
);

module.exports = mongoose;
