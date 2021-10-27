const {
  HttpInternalServerError,
  HttpBadRequestError,
  HttpUnauthenticatedError,
} = require('../utils/HttpErrors')

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error 💥', err)
  }

  debounceError(err)

  let error

  if (err.name === 'CastError')
    error = handleCastErrorDB(err)

  if (err.name === 'MongoError' && err.code === 11000)
    error = handleDublicateFieldsDB(err)

  if (err.name === 'ValidationError')
    error = handleValidationErrorDB(err)

  if (err.name === 'JsonWebTokenError')
    error = handleJWTError()

  if (err.name === 'TokenExpiredError')
    error = handleJWTExpiredTokenError()

  return sendError(error || err, res)
}

function debounceError(err) {
  if (!err.isOperational) {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    return err
  }
}

function sendError(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      name: err.name,
      status: err.status,
      message: err.message,
      data: err.data,
    })
  } else {
    console.error(err)
    const error = new HttpInternalServerError(
      'Something went wrong!'
    )
    res.status(500).json({
      name: error.name,
      status: error.status,
      message: error.message,
    })
  }
}

function handleCastErrorDB(err) {
  return new HttpBadRequestError(
    `Invalid ${err.path}: ${err.value}`
  )
}

function handleDublicateFieldsDB({ keyValue }) {
  const keyMessages = Object.keys(keyValue).map(
    (fieldName) => ({
      fieldName,
      message: `${keyValue[fieldName]} has been used. Please use another one!`,
    })
  )

  return new HttpBadRequestError(
    'Dublicate field value',
    keyMessages
  )
}

function handleValidationErrorDB({ errors }) {
  const keyMessages = Object.keys(errors).map(
    (keyName) => ({
      keyName,
      message: errors[keyName].message,
      value: errors[keyName].value,
    })
  )
  return new HttpBadRequestError(
    `Invalid input data`,
    keyMessages
  )
}

function handleJWTError() {
  return new HttpUnauthenticatedError(
    'Invalid token. Please login again!'
  )
}

function handleJWTExpiredTokenError() {
  return new HttpUnauthenticatedError(
    'Your token has expired!'
  )
}

module.exports = errorHandler
