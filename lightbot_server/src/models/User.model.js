// // Library imports
const mongoose = require('mongoose')
const uV = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
  id: String,
  User_name: {
    type: String,
    required: true,
  },
  User_surname: {
    type: String,
    required: true,
  },
  User_email: {
    type: String,
    required: true,
    unique: true,
  },
  User_password: {
    type: String,
    required: true,
    minlength: 8,
  },
  User_state: {
    type: Number,
    default: 1,
  },
  User_role: {
    type: Number,
    default: 1,
  },
  avatar: {
    type: String,
    default: '../../assets/img/default-avatar.jpg',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ForumPosts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Forum' }],
})

UserSchema.plugin(uV)

module.exports = mongoose.model('User', UserSchema)
