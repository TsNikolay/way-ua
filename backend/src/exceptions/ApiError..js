export default class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static badRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }
}
