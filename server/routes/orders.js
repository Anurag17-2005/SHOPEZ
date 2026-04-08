const express = require('express');
const { auth } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Create order
router.post('/', auth, orderController.createOrder);

// Get user orders
router.get('/my-orders', auth, orderController.getUserOrders);

// Get single order
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;
