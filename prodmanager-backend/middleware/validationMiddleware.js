const { body, param, query, validationResult } = require('express-validator');
const xss = require('xss');

// Custom validator to check if value is a valid URL
const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Sanitize input data
const sanitizeInput = (req, res, next) => {
  // Sanitize request body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key].trim());
      }
    }
  }
  
  // Sanitize query parameters
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = xss(req.query[key].trim());
      }
    }
  }
  
  next();
};

// User Registration Validation
const validateUserRegistration = [
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must contain only letters and spaces'),
    
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  body('password')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be between 6 and 100 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
    
  sanitizeInput,
  handleValidationErrors
];

// User Login Validation
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
    
  sanitizeInput,
  handleValidationErrors
];

// Product Validation
const validateProduct = [
  body('title')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage('Title can only contain letters, numbers, spaces, hyphens, and underscores'),
    
  body('description')
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
    
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
    
  body('image')
    .custom((value) => {
      if (!isValidUrl(value)) {
        throw new Error('Image must be a valid URL');
      }
      return true;
    }),
    
  sanitizeInput,
  handleValidationErrors
];

// Product Update Validation (fields are optional)
const validateProductUpdate = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage('Title can only contain letters, numbers, spaces, hyphens, and underscores'),
    
  body('description')
    .optional()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
    
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
    
  body('image')
    .optional()
    .custom((value) => {
      if (!isValidUrl(value)) {
        throw new Error('Image must be a valid URL');
      }
      return true;
    }),
    
  sanitizeInput,
  handleValidationErrors
];

// ID Parameter Validation
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),
    
  handleValidationErrors
];

// Query Parameter Validation for Products
const validateProductQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  query('sort')
    .optional()
    .isIn(['id', 'title', 'price', 'createdAt', 'updatedAt'])
    .withMessage('Sort field must be one of: id, title, price, createdAt, updatedAt'),
    
  query('order')
    .optional()
    .isIn(['ASC', 'DESC'])
    .withMessage('Order must be either ASC or DESC'),
    
  query('keyword')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Keyword must be between 1 and 50 characters'),
    
  sanitizeInput,
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateProduct,
  validateProductUpdate,
  validateId,
  validateProductQuery,
  sanitizeInput,
  handleValidationErrors
}; 