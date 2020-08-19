const { check } = require('express-validator')

module.exports = (method) => {
    switch (method) {
      case 'createForum': {
        return [
          check('Title', 'Title is a required field')
            .exists()
            .isLength({ max:50 })
            .withMessage('Title must be between 6 & 64 characters in length'),
          check('Message', 'Message is a required field')
            .exists()
            .isLength({ max: 500 })
            .withMessage('Message must be less than 500 characters.'),
        ]
      }
      case 'updateForum': {
        return [
          check('Message', 'Message is a required field')
          .exists()
          .isLength({ max: 500 })
          .withMessage('Message must be less than 500 characters.'),
        ]
      }
    }
  }