import { useContext, useEffect, useState } from "react";
import { Store } from "../store";
import { SAVE_PAYMENT_METHOD } from "../actions";
import CheckoutSteps from "../components/shared/CheckoutSteps";
import Title from "../components/shared/Title";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
// import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";


const PaymentPage = (  ) => {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { cart:{cartItems, shippingAddress, paymentMethod},
    userInfo,
    } = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');
    
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({type: SAVE_PAYMENT_METHOD, payload: paymentMethodName});

        navigate('/placeorder')
    }
    
    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate('/cart');
        }
        if (!userInfo) {
            navigate('/signin?redirect=/payment');
        }

        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [userInfo, navigate, shippingAddress, cartItems]);
  return (
    <div>
        <Title title='Payment'/>
        <CheckoutSteps step1 step2 step3 />
        <Container className="small-container">
            <h1 className="my-3">Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="stripe">
                    <Form.Label>Stripe</Form.Label>
                    <Form.Check
                        type="radio"
                        id="Stripe"

                        value="Stripe"
                        checked={paymentMethodName === 'Stripe'}
                        onChange={(e) => setPaymentMethodName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="PayPal">
                    <Form.Label>PayPal</Form.Label>
                    <Form.Check
                        type="radio"
                        id="PayPal"
                        value="PayPal"
                        checked={paymentMethodName === 'PayPal'}
                        onChange={(e) => setPaymentMethodName(e.target.value)}
                    />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Continue</Button>
                </div>
            </Form>
        </Container>
        
    </div>
  )
}


export default PaymentPage