class AppError extends Error {
  constructor(message, statusCode) {

    super(message);
    this.statusCode = statusCode;
    this.status = false;

    this.isOperational = true; // To differentiate between expected & unexpected errors

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
