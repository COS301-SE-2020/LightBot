const mongoose = require('mongoose')
const uV = require('mongoose-unique-validator')
const Bcrypt = require('bcryptjs')
const { ErrorResponse } = require('../utils/Error.util')

const UserSchema = new mongoose.Schema({
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
    default: 'avatar.png',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ForumPosts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Forum' }],
})

UserSchema.plugin(uV)

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await Bcrypt.genSalt(12)
      this.password = await Bcrypt.hash(this.password, salt)
      this.id = undefined
    } catch (err) {
      return next(new ErrorResponse())
    }
  }
  next()
})

UserSchema.methods.MatchPassword = async (candidate) => {
  return await Bcrypt.compare(candidate, this.password)
}

UserSchema.methods.getJWT = () => {
  return jwt.sign(
    { id: this._id, User_email: this.User_email },
    process.env.AppSecret,
    {
      expiresIn: process.env.ExpiryJWT,
    }
  )
}

module.exports = mongoose.model('User', UserSchema)
