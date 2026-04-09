import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="display-3 mb-4">Welcome to Shop-Ez</h1>
          <p className="lead mb-5">
            Your one-stop destination for effortless online shopping. 
            Discover amazing products, great deals, and seamless checkout experience.
          </p>
          
          <Row className="mb-5">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3" style={{ fontSize: '3rem' }}>🛍️</div>
                  <Card.Title>Wide Selection</Card.Title>
                  <Card.Text>Browse thousands of products across multiple categories</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3" style={{ fontSize: '3rem' }}>🔒</div>
                  <Card.Title>Secure Shopping</Card.Title>
                  <Card.Text>Safe and secure checkout with multiple payment options</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3" style={{ fontSize: '3rem' }}>🚚</div>
                  <Card.Title>Fast Delivery</Card.Title>
                  <Card.Text>Quick and reliable delivery right to your doorstep</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="d-flex gap-3 justify-content-center">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/login')}
              style={{ minWidth: '150px' }}
            >
              Login
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg" 
              onClick={() => navigate('/register')}
              style={{ minWidth: '150px' }}
            >
              Register
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Welcome;
