const asyncHandler = require('express-async-handler')
const { BadRequest, ErrorResponse, NotFound } = require('../utils/Error.util')
const { SuccessResponse } = require('../utils/Success.util')
const User = require('../models/User.model')
const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const send = require('../utils/Mailer.util')
const crypto = require('crypto')

SALT_WORK_FACTOR = 12

const reset_tok_list = new Array()

module.exports = {
  registerUser: asyncHandler(async (req, res, next) => {
    const { User_name, User_surname, User_email, User_password } = req.body
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not register user.')
      )
    }
    if (existing) {
      return next(new ErrorResponse('User already exists please sign in.'))
    }

    const createdUser = new User({
      User_name,
      User_surname,
      User_email,
      User_password,
      ForumPosts: [],
    })
    try {
      const salt = await Bcrypt.genSalt(SALT_WORK_FACTOR)
      createdUser.User_password = await Bcrypt.hash(
        createdUser.User_password,
        salt
      )
      await createdUser.save()
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not register user.')
      )
    }
    res.json(new SuccessResponse('User registration successful.'))
  }),

  loginUser: asyncHandler(async (req, res, next) => {
    const { User_email, User_password } = req.body
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not login user.')
      )
    }
    if (!existing) {
      return next(new NotFound('User does not exist, please sign up.'))
    }
    let isValidPassword = false
    try {
      isValidPassword = await Bcrypt.compare(
        User_password,
        existing.User_password
      )
    } catch (err) {
      return next(
        new ErrorResponse(
          'Something went wrong could not login user.',
          err.body
        )
      )
    }
    if (!isValidPassword) {
      return next(new ErrorResponse('Invalid credentials.'))
    }
    let token
    try {
      const payload = {
        user: {
          id: existing._id,
          User_email: existing.User_email,
        },
      }
      token = jwt.sign(payload, process.env.AppSecret, {
        expiresIn: process.env.ExpiryJWT,
      })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not register user')
      )
    }
    const data = {
      User_name: existing.User_name,
      User_surname: existing.User_surname,
      User_state: existing.User_state,
      User_role: existing.User_role,
      Auth_key: token,
    }
    res.json(new SuccessResponse('User login successful.', data))
  }),

  logoutUser: asyncHandler(async (req, res, next) => {
    //remove refresh token from registry in next sprint
    res.json(
      new SuccessResponse('Successfully signed out user.', 'Redirect sign in.')
    )
  }),

  updateUserDetails: asyncHandler(async (req, res, next) => {
    //once sure of what data (files/images) update according to password update model
    const { User_role, User_state, avatar } = req.body
    const { User_id, User_email } = req.User_data
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update details.')
      )
    }
    //existing.User_role = User_role
    if (User_role) {
      existing.User_role = User_role
    }
    if (User_state) {
      existing.User_state = User_state
    }
    if (avatar) {
      existing.avatar = avatar
    }
    try {
      await existing.save()
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update details2.')
      )
    }
    res.json(
      new SuccessResponse('Successfully updated user details.', 'existing')
    )
  }),

  updateUserPass: asyncHandler(async (req, res, next) => {
    const { User_password } = req.body
    const { User_id, User_email } = req.User_data
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update password.')
      )
    }

    try {
      const salt = await Bcrypt.genSalt(SALT_WORK_FACTOR)
      existing.User_password = await Bcrypt.hash(User_password, salt)
      await existing.save()
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update password.')
      )
    }
    res.json(new SuccessResponse('Successfully updated user password.'))
  }),

  recoverUserPass: asyncHandler(async (req, res, next) => {
    const { User_email } = req.body
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update password.')
      )
    }
    if (!existing) {
      return next(new NotFound('User does not exist.'))
    }
    const build = {
      expiry: Date.now() + 10 * 60 * 1000,
      User_email: User_email,
      hash: crypto
        .createHash('sha256')
        .update(crypto.randomBytes(20).toString('hex'))
        .digest('hex'),
    }
    reset_tok_list.push(build)
    const resetURL = `${req.protocol}://localhost:3000/reset?passresetid=${build.hash}`
    const message = `You are receiving this email because you have requested a password reset for your lightbot account.
    If this was not you please ignore this email.
    Please click the link below to reset your password: \n\n --> ${resetURL} `

    try {
      await send({
        email: User_email,
        subject: 'Lightbot password reset',
        message,
      })
    } catch (err) {
      console.log(err)
      return next(
        new ErrorResponse('Something went wrong could not send email.')
      )
    }

    res.json(
      new SuccessResponse(
        'If an account associated with this address exists, an email will be sent to it.',
        'Miscellaneous'
      )
    )
  }),

  resetUserPass: asyncHandler(async (req, res, next) => {
    const validate = req.params.passresetid

    const { User_password } = req.body
    let build = null
    reset_tok_list.forEach((element) => {
      if (element.hash === validate) build = element
    })
    if (!build) {
      return next(new BadRequest('Invalid reset token.'))
    }
    const { User_email } = build

    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update password.')
      )
    }
    try {
      const salt = await Bcrypt.genSalt(SALT_WORK_FACTOR)
      existing.User_password = await Bcrypt.hash(User_password, salt)
      await existing.save()
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update password.')
      )
    }
    res.json(new SuccessResponse('Successfully reset user password.'))
  }),

  deleteUser: asyncHandler(async (req, res, next) => {
    const { User_id, User_email } = req.User_data
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not delete user.')
      )
    }
    try {
      await existing.remove()
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not delete user.')
      )
    }
    res.json(
      new SuccessResponse('Successfully removed user.', 'Redirect to sign in.')
    )
  }),

  returnUsers: asyncHandler(async (req, res, next) => {
    let users
    try {
      users = await User.find({}, '-User_password')
    } catch (err) {
      return next(new ErrorResponse('Fetching users failed.'))
    }
    res.json(
      new SuccessResponse(
        'Successfully removed user.',
        users.map((user) => user.toObject({ getters: true }))
      )
    )
  }),
  returnProfile: asyncHandler(async (req, res, next) => {
    const { User_id, User_email } = req.User_data
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not get user profile.')
      )
    }
    const token = req.headers.authorization.split(' ')[1]
    const data = {
      User_name: existing.User_name,
      User_surname: existing.User_surname,
      User_state: existing.User_state,
      User_role: existing.User_role,
      Auth_key: token,
    }
    res.json(new SuccessResponse('Succesfully retrieved user profile.', data))
  }),
}
