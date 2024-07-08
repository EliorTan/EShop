import PropTypes from 'prop-types'
import MessageBox from '../shared/MessageBox'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Store } from '../../store'
import Rating from '../shared/Rating'

const ItemsInCart = ({cartItems, updateCartHandler, removeItemHandler}) => {
  return (
    <div>
        {cartItems.length === 0 ? (
            <MessageBox>
                Your cart is empty
                <Link to="/">Go Shopping</Link>
            </MessageBox>
        ) : (
            <ListGroup>
                {cartItems.map((item) => (

                    <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="img-fluid rounded img-thumbnail"
                                ></img>{' '}
                                <Link to={`/product/${item.token}`}>{item.title}</Link>
                            </Col>
                            <Col md={3}>
                                <Button
                                    variant="light"
                                    name="minusButton"
                                    onClick={() =>
                                        updateCartHandler(item, item.quantity - 1)
                                    }
                                    disabled={item.quantity === 1}
                                >
                                    <i className="fas fa-minus-circle"></i>
                                </Button>{' '}
                                <span>{item.quantity}</span>{' '}
                                <Button
                                    variant="light"
                                    name="plusButton"
                                    onClick={() =>
                                        updateCartHandler(item, item.quantity + 1)
                                    }
                                    disabled={item.quantity === item.countInStock}
                                >
                                    <i className="fas fa-plus-circle"></i>
                                </Button>
                                {/* <Rating
                                    rating={item.rating.rate}
                                    numReviews={item.rating.count}
                                ></Rating> */}
                            </Col>
                            <Col md={1}>${item.price}</Col>
                            <Col md={1}>
                                <Button
                                    variant="light"
                                    onClick={() => removeItemHandler(item)}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        
        )}
    </div>
  )
}

ItemsInCart.propTypes = {
  cartItems: PropTypes.array,
  updateCartHandler: PropTypes.func,
  removeItemHandler: PropTypes.func,
}

export default ItemsInCart