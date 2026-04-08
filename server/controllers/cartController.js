const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    
    if (!cart) {
      return res.json({ items: [] });
    }
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    let cart = await Cart.findOne({ user: req.user.userId });
    
    if (!cart) {
      cart = new Cart({
        user: req.user.userId,
        items: []
      });
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findOne({ user: req.user.userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ user: req.user.userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = [];
    await cart.save();
    
    res.json({ message: 'Cart cleared', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
