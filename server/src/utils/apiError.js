// @desc This class represents operational error messages (errors that I can predict)
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "failed" : "error";
    this.isOperational = true;
  }
}

module.exports = ApiError;
