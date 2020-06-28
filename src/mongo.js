// Connect to DB via Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL || 'mongodb://mongodb:27017/wall', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

module.exports = mongoose
