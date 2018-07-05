const mongoose = require('./mongo');

// Mongoose schema and model
const messageSchema = mongoose.Schema({
  text: String,
  author: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('movie', messageSchema);

module.exports = Message;
