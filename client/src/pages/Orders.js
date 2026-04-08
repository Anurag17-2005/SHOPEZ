import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import API from '../utils/api';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/my-orders');
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      PROCESSING: 'info',
      SHIPPED: 'primary',
      DELIVERED: 'success',
      CANCELLED: 'danger'
    };
    return colors[status] || 'secondary';
  };

  return (
    <Container>
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.substring(0, 8)}...</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.product?.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
                  <Badge bg={getStatusColor(order.status)}>{order.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Orders;
