// // Library imports
const asyncHandler = require('express-async-handler')
const { v4: uuidV4 } = require('uuid')

module.exports = {
  redirectRoom: asyncHandler(async (req, res, next) => {
    res.redirect('/${uuidV4()}')
  }),
  enterRoom: asyncHandler(async (req, res, next) => {
    res.render('room', { roomId: req.params.room })
  }),
}
