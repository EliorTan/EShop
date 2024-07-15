import { useContext, useEffect, useState } from "react";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART } from "../actions";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Title from "../components/shared/Title";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CheckoutSteps from "../components/shared/CheckoutSteps";
import { ListGroup } from "react-bootstrap";
import "../App.css";
import Loading from "../components/shared/Loading";

const SubmitOrderPage = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const { paymentMethod, cartItems, shippingAddress } = cart;
  const navigation = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigation("/signin?redirect=/placeorder");
    }

    if (!paymentMethod) {
      navigation("/payment");
    }

    if (!shippingAddress) {
      navigation("/shipping");
    }

    if (cartItems.length === 0) {
      navigation("/cart");
      toast.error("Cart is empty");
    }
  }, [navigation, cart, paymentMethod, shippingAddress, userInfo, cartItems]);

  const submitOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/v1/orders",
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      //TODO: More code here later.
      ctxDispatch({ type: CLEAR_CART });
      localStorage.removeItem("cartItems");
      navigation(`/order/${data.order._id}`);
    } catch (error) {
      toast.error(getError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.taxPrice = round2(0.17 * cart.itemsPrice);
  cart.shippingPrice =
    cart.itemsPrice < 50
      ? round2(cart.itemsPrice * 0.02)
      : round2(cart.itemsPrice * 0.1);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

  return (
    <div>
      <Title title="Order Summary" />
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="my-3">Order Summary</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {shippingAddress.fullName} <br />
                <strong>Address: </strong> {shippingAddress.address} <br />
                <strong>City: </strong> {shippingAddress.city} <br />
                <strong>Postal Code: </strong> {shippingAddress.postalCode}{" "}
                <br />
                <strong>Country: </strong> {shippingAddress.country} <br />
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong> {paymentMethod} <br />
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                <Row className="align-items-center mb-3">
                  <Col md={6} className="image-container">
                    Description
                  </Col>
                  <Col md={3}>Quantity</Col>
                  <Col md={3}>Price</Col>
                </Row>

                {cartItems.map((item) => (
                  <ListGroup key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6} className="image-container">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail mb-2"
                        ></img>{" "}
                        <Link
                          to={`/product/${item.token}`}
                          className="btn btn-light"
                        >
                          {item.title}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup>
                ))}
              </ListGroup>
              <Link to="/cart" className="btn btn-light my-3">
                Edit cart
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row className="align-items-center mb-3">
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={submitOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                  {loading && <Loading />}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SubmitOrderPage;
