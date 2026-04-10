import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import API from '../utils/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      
      // Fetch related products from same category
      const { data: allProducts } = await API.get('/products', { 
        params: { category: data.category } 
      });
      const related = allProducts.filter(p => p._id !== id).slice(0, 3);
      setRelatedProducts(related);
    } catch (err) {
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Added to cart!');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/products/${id}/review`, review);
      setReview({ rating: 5, comment: '' });
      fetchProduct();
      alert('Review submitted!');
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center my-5">
        <h3>Product not found</h3>
        <Button onClick={() => navigate('/home')}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <img 
            src={product.mainImg} 
            alt={product.title} 
            className="img-fluid rounded" 
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <div className="mb-3">
            <span className="text-warning fs-5">{'⭐'.repeat(Math.round(product.rating || 0))}</span>
            <span className="text-muted ms-2">
              {(product.rating || 0).toFixed(1)} ({product.reviews?.length || 0} reviews)
            </span>
          </div>
          <h3 className="text-primary mb-3">${product.price}</h3>
          <p className="text-muted">Category: <strong>{product.category}</strong></p>
          
          <p className="text-success">
            ✓ In Stock
          </p>
          
          <p className="lead">{product.description}</p>
          
          <Form.Group className="mb-3" style={{ maxWidth: '150px' }}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </Form.Group>
          
          <div className="d-flex gap-2">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outline-secondary" 
              size="lg"
              onClick={() => navigate('/home')}
            >
              Continue Shopping
            </Button>
          </div>
        </Col>
      </Row>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Row className="mt-5">
          <Col>
            <h4 className="mb-4">Related Products</h4>
            <Row>
              {relatedProducts.map(p => (
                <Col key={p._id} md={4}>
                  <Card 
                    className="product-card h-100"
                    onClick={() => navigate(`/product/${p._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Img 
                      variant="top" 
                      src={p.mainImg} 
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{p.title}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="text-primary mb-0">${p.price}</h5>
                        <span className="text-warning">⭐ {(p.rating || 0).toFixed(1)}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      <Row className="mt-5">
        <Col>
          <h4>Customer Reviews ({product.reviews?.length || 0})</h4>
          {!product.reviews || product.reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first to review!</p>
          ) : (
            product.reviews.map((r, idx) => (
              <Card key={idx} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>{r.user?.name || 'Anonymous'}</Card.Title>
                    <span className="text-warning">{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <Card.Text>{r.comment}</Card.Text>
                  <small className="text-muted">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </small>
                </Card.Body>
              </Card>
            ))
          )}

          {user && (
            <Card className="mt-4">
              <Card.Body>
                <h5>Write a Review</h5>
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={review.rating}
                      onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Terrible</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={review.comment}
                      onChange={(e) => setReview({ ...review, comment: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">Submit Review</Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
