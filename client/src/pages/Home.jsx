import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { CartContext } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products', { params: { category, search } });
      let sortedProducts = [...data];
      
      // Apply sorting
      if (sortBy === 'price-low') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'name') {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      }
      
      setProducts(sortedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Welcome to ShopEZ</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Accessories">Accessories</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A to Z</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center my-5">
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <Row>
          {products.map(product => (
            <Col key={product._id} md={4} className="mb-4">
              <Card className="product-card h-100">
                <div style={{ position: 'relative' }}>
                  <Card.Img 
                    variant="top" 
                    src={product.mainImg} 
                    style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-muted small">{product.category}</Card.Text>
                  <Card.Text className="flex-grow-1">{product.description.substring(0, 80)}...</Card.Text>
                  <div className="mb-2">
                    <span className="text-warning">{'⭐'.repeat(Math.round(product.rating || 0))}</span>
                    <span className="text-muted ms-2">({(product.rating || 0).toFixed(1)})</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <h5 className="text-primary mb-0">${product.price}</h5>
                    <div>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => {
                          addToCart(product);
                          alert('Added to cart!');
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
