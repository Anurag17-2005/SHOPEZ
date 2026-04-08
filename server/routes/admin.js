const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const { productValidation } = require('../middleware/validation');
const adminController = require('../controllers/adminController');

const router = express.Router();

// All routes require admin authentication
router.use(auth, adminAuth);

// Get all orders
router.get('/orders', adminController.getAllOrders);

// Update order status
router.patch('/orders/:id', adminController.updateOrderStatus);

// Create product
router.post('/products', productValidation, adminController.createProduct);

// Update product
router.put('/products/:id', productValidation, adminController.updateProduct);

// Delete product
router.delete('/products/:id', adminController.deleteProduct);

// Get all users
router.get('/users', adminController.getAllUsers);

// Dashboard stats
router.get('/stats', adminController.getDashboardStats);

module.exports = router;
