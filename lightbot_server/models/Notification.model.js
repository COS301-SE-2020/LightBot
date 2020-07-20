const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  id: String,
  Title: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('notification', UserSchema)
