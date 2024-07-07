import { useContext } from "react";
import { Store } from "../store";
import axios from "axios";
import { ADD_TO_CART, GET_FAIL } from "../actions";
import { getError } from "../utils";
import Title from "../components/shared/Title";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemsInCart from "../components/cart/ItemsInCart";
import Checkout from "../components/cart/Checkout";



const CartPage = () => {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { cart:{cartItems} } = state;
    
    //TODO: Add Navigation and redirection

    const updateCartHandler = async (item, quantity) => {
        try {
            const {data:product} = await axios.get(`/api/v1/products/${item._id}`)
            
            if (product.countInStock < quantity) {
                toast.error('Sorry. Product is out of stock')
                return
            }
            
            ctxDispatch({
                type: ADD_TO_CART,
                payload: { ...item, quantity },
            })
        } catch (error) {
            ctxDispatch({
                type: GET_FAIL,
                payload: error.message,
            })
            toast.error(getError(error))
        }
    }

    //TODO: Add RemoveItemHendler
    return (
    <div>
        <Title Title="Shopping Cart"/>
        <Row>
            <Col md={8}>
                <ItemsInCart cartItems={cartItems} updateCartHandler={updateCartHandler}/>
            </Col>
            <Col md={4}>
                <Checkout cartItems={cartItems}/>
            </Col>
        </Row>
    </div>
  )
}

export default CartPage