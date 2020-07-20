const mongoose = require('mongoose')

const GraphSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dataset: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('graph', GraphSchema)