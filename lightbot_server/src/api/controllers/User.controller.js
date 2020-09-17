// // Config imports
const config = require('../../config')

// // Library imports
const asyncHandler = require('express-async-handler')
const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// // Service imports
const send = require('../../services/Mailer.service')

// // Model imports
const {
  BadRequest,
  ErrorResponse,
  NotFound,
} = require('../../models/Error.model')
const { SuccessResponse } = require('../../models/Success.model')
const User = require('../../models/User.model')

// // Constants
SALT_WORK_FACTOR = 12
const reset_tok_list = new Array()

module.exports = {
  registerUser: asyncHandler(async (req, res, next) => {
    const { User_name, User_surname, User_email, User_password } = req.body
    try {
      let existing = await User.findOne({ User_email: User_email })

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
      token = jwt.sign(payload, config.appSecret, {
        expiresIn: config.jwtExpiry,
      })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not login user')
      )
    }
    res.json(new SuccessResponse('User login successful.', { Auth_key: token }))
  }),

  logoutUser: asyncHandler(async (req, res, next) => {
    //remove refresh token from registry in next sprint
    res.json(
      new SuccessResponse(
        'Successfully signed out user.',
        'Redirect to sign in.'
      )
    )
  }),

  updateUserImage: asyncHandler(async (req, res, next) => {
    const { avatar } = req.body
    const { User_id, User_email } = req.User_data
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update user image.')
      )
    }

    existing.avatar = avatar

    try {
      await existing.save()
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update user image.')
      )
    }
    res.json(new SuccessResponse('Successfully updated user image.'))
  }),

  updateUserDetails: asyncHandler(async (req, res, next) => {
    //once sure of what data (files/images) update according to password update model
    const { User_name, User_surname } = req.body
    const { User_id, User_email } = req.User_data
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update details.')
      )
    }
    if (User_name) {
      existing.User_name = User_name
    }
    if (User_surname) {
      existing.User_surname = User_surname
    }
    try {
      await existing.save()
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update details.')
      )
    }
    res.json(new SuccessResponse('Successfully updated user details.'))
  }),

  updateUserPass: asyncHandler(async (req, res, next) => {
    const { User_password, User_oldpassword } = req.body
    const { User_id, User_email } = req.User_data
    let existing
    try {
      existing = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update password.')
      )
    }

    let isValidPassword = false
    try {
      isValidPassword = await Bcrypt.compare(
        User_oldpassword,
        existing.User_password
      )
    } catch (err) {
      return next(
        new ErrorResponse(
          'Something went wrong could not match passwords.',
          err.body
        )
      )
    }
    if (!isValidPassword) {
      return next(new ErrorResponse('Invalid old password'))
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
    const resetURL = `${req.protocol}://lightbot.co.za/reset?passresetid=${build.hash}`
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
    const data = {
      User_email: existing.User_email,
      User_name: existing.User_name,
      User_surname: existing.User_surname,
      User_state: existing.User_state,
      User_role: existing.User_role,
      ForumPosts: existing.ForumPosts,
      avatar: existing.avatar,
    }
    res.json(new SuccessResponse('Succesfully retrieved user profile.', data))
  }),
}
