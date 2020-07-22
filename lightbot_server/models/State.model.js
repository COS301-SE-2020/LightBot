const mongoose = require('mongoose')

const StateSchema = new mongoose.Schema({
  id: String,
  State: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('state', StateSchema)
