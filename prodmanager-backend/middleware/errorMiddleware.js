const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(`Stack: ${err.stack}`);

  // Log request details for debugging
  console.error(`Request: ${req.method} ${req.path}`);
  console.error(`Body:`, req.body);
  console.error(`Query:`, req.query);
  console.error(`Params:`, req.params);

  // Default error response
  let error = {
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Sequelize Validation Error
  if (err instanceof ValidationError) {
    const validationErrors = err.errors.map(error => ({
      field: error.path,
      message: error.message,
      value: error.value
    }));
    
    error = {
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    };
    return res.status(400).json(error);
  }

  // Sequelize Unique Constraint Error
  if (err instanceof UniqueConstraintError) {
    const field = err.errors[0].path;
    error = {
      success: false,
      message: `${field} already exists`,
      field: field
    };
    return res.status(400).json(error);
  }

  // Sequelize Foreign Key Constraint Error
  if (err instanceof ForeignKeyConstraintError) {
    error = {
      success: false,
      message: 'Referenced record does not exist'
    };
    return res.status(400).json(error);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      success: false,
      message: 'Invalid token'
    };
    return res.status(401).json(error);
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      success: false,
      message: 'Token expired'
    };
    return res.status(401).json(error);
  }

  // Database connection errors
  if (err.name === 'SequelizeConnectionError') {
    error = {
      success: false,
      message: 'Database connection failed'
    };
    return res.status(503).json(error);
  }

  // Cast error (invalid ObjectId format)
  if (err.name === 'CastError') {
    error = {
      success: false,
      message: 'Invalid ID format'
    };
    return res.status(400).json(error);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = {
      success: false,
      message: `${field} already exists`
    };
    return res.status(400).json(error);
  }

  // Rate limiting error
  if (err.message === 'Too many requests') {
    error = {
      success: false,
      message: 'Too many requests, please try again later'
    };
    return res.status(429).json(error);
  }

  // Custom application errors
  if (err.statusCode) {
    error = {
      success: false,
      message: err.message
    };
    return res.status(err.statusCode).json(error);
  }

  // Default to 500 server error
  res.status(500).json(error);
};

// Not found middleware
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler
}; 