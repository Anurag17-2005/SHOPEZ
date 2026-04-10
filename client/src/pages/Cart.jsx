import React, { useContext, useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }

    if (!address) {
      alert('Please enter shipping address');
      return;
    }

    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        shippingAddress: address,
        paymentMethod: 'COD'
      };

      await API.post('/orders', orderData);
      clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="mt-5">
        <h2>Your Cart is Empty</h2>
        <Button onClick={() => navigate('/home')}>Continue Shopping</Button>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Shopping Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  style={{ width: '80px' }}
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end">
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>

      <div className="mt-4">
        <h5>Shipping Address</h5>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-3"
        />
        <Button variant="success" size="lg" onClick={handleCheckout}>
          Place Order
        </Button>
      </div>
    </Container>
  );
}

export default Cart;
