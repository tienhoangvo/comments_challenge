class HttpError extends Error {
  constructor(
    name,
    statusCode,
    message,
    isOperational = true
  ) {
    super(message)

    this.name = name
    this.statusCode = statusCode
    this.status =
      statusCode >= 400 && statusCode <= 451
        ? 'fail'
        : 'error'
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

class HttpBadRequestError extends HttpError {
  constructor(message = 'Bad request', data) {
    super('HttpBadRequest', 400, message)
    this.data = data
  }
}

class HttpUnauthenticatedError extends HttpError {
  constructor(message = 'Unauthenticated') {
    super('HttpUnauthenticated', 401, message)
  }
}

class HttpUnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super('HttpUnauthorized', 403, message)
  }
}

class HttpNotFoundError extends HttpError {
  constructor(message = 'Not found') {
    super('HttpNotFound', 404, message)
  }
}

class HttpInternalServerError extends HttpError {
  constructor(message = 'Internal server error') {
    super('HttpInternalServerError', 500, message)
  }
}

module.exports = {
  HttpError,
  HttpBadRequestError,
  HttpUnauthenticatedError,
  HttpUnauthorizedError,
  HttpNotFoundError,
  HttpInternalServerError,
}
