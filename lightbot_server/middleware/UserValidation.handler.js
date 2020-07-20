const { check} = require('express-validator')

module.exports = (method) => {
    switch (method) {
      case 'registerUser': {
        return [
          check('User_name', 'Name is a required field')
            .exists()
            .isLength({ min: 6, max: 64 })
            .withMessage('Name must be between 6 & 64 characters in length'),
          check('User_surname', 'Surname is a required field')
            .exists()
            .isLength({ min: 6, max: 64 })
            .withMessage('Surname must be between 6 & 64 characters in length'),
          check('User_email', 'Email is a required field')
            .exists()
            .isEmail()
            .withMessage('Please include a valid email address')
            .isLength({ min: 6, max: 64 })
            .withMessage('Email must be between 6 & 64 characters in length'),
          check('User_password', 'Password is a required field')
            .exists()
            .isLength({ min: 8 })
            .withMessage(
              'Password must be greater than 8 characters in length'
            ),
          check('avatar', 'Avatar not in string format').optional().isString(),
        ]
      }
      case 'loginUser': {
        return [
          check('User_email', 'Email is a required field')
            .exists()
            .isEmail()
            .withMessage('Please include a valid email address')
            .isLength({ min: 6, max: 64 })
            .withMessage('Email must be between 6 & 64 characters in length'),
          check('User_password', 'Password is a required field')
            .exists()
            .isLength({ min: 8 })
            .withMessage(
              'Password must be greater than 8 characters in length'
            ),
        ]
      }
      case 'updateUserDetails': {
        return []
      }
      case 'updateUserPass': {
        return []
      }
      case 'resetUserPass': {
        return []
      }
    }
  }