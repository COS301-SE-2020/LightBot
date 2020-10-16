// // Model imports
const { ErrorResponse } = require('../models/Error.model')

module.exports = (err, req, res, next) => {
    return res.status((typeof err.getCode === "function")?err.getCode():500).json({
        error : {
            status: (typeof err.getCode === "function")?err.getCode():500,
            message: err.message || "Internal Server Error",
            data: err.data
        }
    })
}