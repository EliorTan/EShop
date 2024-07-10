import React, { useContext, useEffect } from 'react'
import { Store } from '../store'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GET_FAIL, GET_REQUEST } from '../actions';
import { getError } from '../utils';
import Loading from '../components/shared/Loading';
import MessageBox from '../components/shared/MessageBox';

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

    const [{loading , error, order}, dispatch] = useReducer(orderPageReducer, initialState );

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
        {loading ? <Loading /> : error ? <MessageBox variant="danger">{error}</MessageBox> : <Loading /> } 
        {/* <OrderDescription order={order} />} */}

    </div>
  )
}

export default OrderPage