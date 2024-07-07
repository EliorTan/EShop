import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import PropTypes from 'prop-types'
import ListGroup from 'react-bootstrap/ListGroup'


const CartDescription = ({product, addToCart}) => {
  return (
    <Card>
        <Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col>Price</Col>
                        <Col>${product.price}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Status</Col>
                        <Col>
                            {product.countInStock > 0 ? (
                                <Badge bg="success">In Stock</Badge>
                            ) : (
                                <Badge bg="danger">Unavailable</Badge>
                            )}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="d-grid">
                        <Button onClick={addToCart} variant="primary">
                            Add to Cart
                        </Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  )
}

CartDescription.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func
}

export default CartDescription