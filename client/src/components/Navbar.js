import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BSNavbar.Brand as={Link} to={user ? "/home" : "/"}>Shop-Ez</BSNavbar.Brand>
        <BSNavbar.Toggle />
        <BSNavbar.Collapse>
          <Nav className="me-auto">
            {user && <Nav.Link as={Link} to="/home">Home</Nav.Link>}
            {user?.role === 'ADMIN' && (
              <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/orders">My Orders</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart {cart.length > 0 && <Badge bg="danger">{cart.length}</Badge>}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout ({user.name})</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
