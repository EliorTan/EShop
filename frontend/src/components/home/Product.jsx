import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from '../shared/Rating';
import { useContext } from 'react';
import { addToCartHandler } from '../../utils';
import { Store } from '../../store';


const Product = ({product}) => {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { cart: {cartItems} } = state;

    
    return (
    <Card className="product-card">
        <Link to={`/product/${product.token}`}>
            <Card.Img style={{padding: "20px"}} variant="top" src={product.image} alt={product.token}/>
        </Link>
        <Card.Body className="card-body">
            <Card.Title>
                <Link to={`/product/${product.token}`}>
                    {product.title}
                </Link>
            </Card.Title>

            <Rating rating={product.rating.rate} numReviews={product.rating.count}/>

            <Card.Text>
                <strong>${product.price}</strong>
            </Card.Text>

            {/* <Link to={`/`}> */}
                {product.countInStock === 0 ? 
                (<Button variant="light" disabled>Out of Stock</Button>) :
                (<Button className='btn-primary' onClick={() => addToCartHandler(product,cartItems,ctxDispatch)}>Add to Cart</Button>)}
            {/* </Link> */}
        </Card.Body>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object
}

export default Product