import ListGroup from 'react-bootstrap/ListGroup'
import Title from '../shared/Title'
import Rating from '../shared/Rating'
import PropTypes from 'prop-types'

const ProductDescription = ({title,rating,price,description}) => {
  return (
    <ListGroup>
        <ListGroup.Item>
            <Title title={title}/>
            <h1 style={{wordWarp: "break-word"}}> {title} </h1>
        </ListGroup.Item>
        <ListGroup.Item>
            <Rating rating={rating.rate} numReviews={rating.count}/>
        </ListGroup.Item>
        <ListGroup.Item>
            <h3>${price}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
            Description: <p className='lead'>{description}</p>
        </ListGroup.Item>
    </ListGroup>
  )
}

ProductDescription.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string
}

export default ProductDescription