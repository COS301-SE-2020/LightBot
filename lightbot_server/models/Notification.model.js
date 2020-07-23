const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('notification', NotificationSchema)
