// // Library imports
const mongoose = require('mongoose')

const GraphSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  metric: {
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