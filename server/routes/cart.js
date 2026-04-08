const express = require('express');
const { auth } = require('../middleware/auth');
const cartController = require('../controllers/cartController');

const router = express.Router();

// All cart routes require authentication
router.use(auth);

// Get user cart
router.get('/', cartController.getCart);

// Add item to cart
router.post('/add', cartController.addToCart);

// Update cart item quantity
router.put('/update', cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:productId', cartController.removeFromCart);

// Clear cart
router.delete('/clear', cartController.clearCart);

module.exports = router;
