const ErrorResponse = require('../utilities/ErrorResponse')

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red)

  let error = { ...err }
  error.message = err.message

  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  } else if (err.name === 'MongoError' && err.code === 11000) {
    const message = `Dublicate field value entered`
    error = new ErrorResponse(message, 400)
  } else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(", ")
    error = new ErrorResponse(message, 400)
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' })
}

module.exports = errorHandler
