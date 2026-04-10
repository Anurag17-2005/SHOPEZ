const { body, validationResult } = require('express-validator');

// Validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array() 
    });
  }
  next();
};

// User registration validation
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

// User login validation
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
];

// Product validation
const productValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Product title is required'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('gender')
    .optional()
    .trim(),
  body('sizes')
    .optional()
    .isArray().withMessage('Sizes must be an array'),
  body('discount')
    .optional()
    .isNumeric().withMessage('Discount must be a number'),
  validate
];

// Order validation
const orderValidation = [
  body('userId')
    .notEmpty().withMessage('User ID is required'),
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('mobile')
    .trim()
    .notEmpty().withMessage('Mobile number is required'),
  body('address')
    .trim()
    .notEmpty().withMessage('Address is required'),
  body('pincode')
    .trim()
    .notEmpty().withMessage('Pincode is required'),
  body('paymentMethod')
    .trim()
    .notEmpty().withMessage('Payment method is required'),
  validate
];

// Cart validation
const cartValidation = [
  body('userId')
    .notEmpty().withMessage('User ID is required'),
  body('title')
    .trim()
    .notEmpty().withMessage('Product title is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number'),
  body('quantity')
    .notEmpty().withMessage('Quantity is required'),
  validate
];

// Review validation
const reviewValidation = [
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty().withMessage('Comment is required')
    .isLength({ min: 5 }).withMessage('Comment must be at least 5 characters'),
  validate
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  productValidation,
  orderValidation,
  cartValidation,
  reviewValidation
};
