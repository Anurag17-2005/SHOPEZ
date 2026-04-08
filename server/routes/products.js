const express = require('express');
const { auth } = require('../middleware/auth');
const { reviewValidation } = require('../middleware/validation');
const productController = require('../controllers/productController');

const router = express.Router();

// Get all products
router.get('/', productController.getAllProducts);

// Get single product
router.get('/:id', productController.getProductById);

// Add review
router.post('/:id/review', auth, reviewValidation, productController.addReview);

module.exports = router;
