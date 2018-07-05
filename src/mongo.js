// Connect to DB via Mongoose
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    replicaSet: process.env.MONGODB_REPLICA_SET || 'Cluster0-shard-0',
    ssl: process.env.MONGODB_SSL || true,
    retryWrites: process.env.MONGODB_RETRY_WRITES || true,
    authSource: process.env.MONGODB_AUTH_SOURCE || 'admin'
  }
);

module.exports = mongoose;
