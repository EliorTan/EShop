import React, { useContext, useEffect } from 'react'
import { Store } from '../store'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../actions';
import { getError } from '../utils';
import Loading from '../components/shared/Loading';
import MessageBox from '../components/shared/MessageBox';
import Title from '../components/shared/Title';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import { useReducer } from 'react';


const OrderPage = () => {
    const {state: {userInfo}} = useContext(Store);
    const params = useParams();
    const {id: orderId} = params;
    const navigate = useNavigate();

    const initialState = {
        loading: true,
        order: {},
        error: '',
    }

    const [{loading , error, order}, dispatch] = useReducer( orderPageReducer, initialState );

    useEffect(() => {
        const getOrder = async () => {
            dispatch({ type: GET_REQUEST });
            try {
                const {data} = await axios.get(`/api/v1/orders/${orderId}`, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                });
                dispatch({ type: GET_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: GET_FAIL, payload: getError(error) });
                toast.error(getError(error));
            }
        };

        if (!userInfo) {
            navigate('/signin');
        }

        if (!order._id || (order._id && order._id !== orderId) || order == {} ) {
            getOrder();
        }
    
    }, [ navigate, userInfo, orderId, order  ]);
  return (
    <div>
        Order
        {loading ? <Loading /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
            <div>
                <Title title="Order" />
                <h1 className='my-3'>Order: {order._id.substr(order._id.length - 6)}</h1>
                <Row>
                    <Col md={8}>

                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Shipping</Card.Title>
                                <Card.Text>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {order.shippingAddress.address},{' '}
                                    {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postalCode}
                                </Card.Text>
                                {order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Delivered at {order.deliveredAt}
                                    </MessageBox>
                                ): (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </Card.Body>
                        </Card>

                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </Card.Text>
                                {order.isPaid ? (
                                    <MessageBox variant="success">
                                        Paid at {order.paidAt}
                                    </MessageBox>
                                ): (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </Card.Body>
                        </Card>

                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Items</Card.Title>
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={6}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded img-thumbnail"
                                                    ></img>{' '}
                                                    <Link to={`/product/${item.token}`}>{item.title}</Link>
                                                </Col>
                                                <Col md={3}>
                                                    <span>{item.quantity}</span>
                                                </Col>
                                                <Col md={3}>${item.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </div>
        ) } 

        {/* <OrderDescription order={order} />} */}

    </div>
  )
}

export default OrderPage