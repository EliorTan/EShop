import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Title from "../components/shared/Title";
import CheckoutSteps from "../components/shared/CheckoutSteps";
import { SAVE_SHIPPING_ADDRESS } from "../actions";


const ShippingAddressPage = () => {

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo, cart: { cartItems, shippingAddress }} = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || "");
    const [address, setAddress] = useState(shippingAddress.address ||"");
    const [city, setCity] = useState(shippingAddress.city ||"");
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");
    
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate, cartItems]);


    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: SAVE_SHIPPING_ADDRESS,
            payload: { fullName, address, city, postalCode, country },
        });

        navigate('/payment');
    };

    useEffect(() => {
        if (cartItems.length === 0) {
          navigate('/');
        }
        if (!userInfo) {
          navigate('/signin?redirect=/shipping');
        }
      }, [userInfo, navigate, cartItems]);

    return (
        <div>
            <Title title='Shipping Address'/>
            <CheckoutSteps step1 step2 />
            <Container className="small-container">
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control name="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
  )
}

export default ShippingAddressPage