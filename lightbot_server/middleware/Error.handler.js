const { ErrorResponse } = require('../utils/Error.util')

module.exports = (err, req, res, next) => {
    let code = err.getCode()
    return res.status(code||500).json({
        error : {
            status: code || 500,
            message: err.message || "Internal Server Error",
            data: err.data
        }
    })
}