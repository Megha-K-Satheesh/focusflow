class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class AuthenticationError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

class AuthorizationError extends AppError {
  constructor(message) {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

class ErrorFactory {
  static validation(msg) {
    return new ValidationError(msg);
  }

  static authentication(msg) {
    return new AuthenticationError(msg);
  }

  static authorization(msg) {
    return new AuthorizationError(msg);
  }

  static notFound(msg) {
    return new NotFoundError(msg);
  }

  static conflict(msg) {
    return new ConflictError(msg);
  }
}

export {
  AppError,
  AuthenticationError,
  AuthorizationError,
  ConflictError,
  ErrorFactory,
  NotFoundError,
  ValidationError
};

