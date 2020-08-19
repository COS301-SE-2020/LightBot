const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('Forum', ForumSchema)
