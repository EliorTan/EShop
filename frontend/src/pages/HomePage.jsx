import Title from '../components/shared/Title.jsx';
import {useReducer} from 'react';
import homePageReducer from '../reducers/homePageReducer.jsx';
import { GET_REQUEST, GET_SUCCESS, GET_ERROR } from '../actions.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import Products from '../components/home/Prodacts.jsx';
import Loading from '../components/shared/Loading.jsx';
import MessageBox from '../components/shared/MessageBox.jsx';


const initialState = {
    loading: true,
    error: "",
    products: [],
}

const HomePage = () => {
    const [state, dispatch] = useReducer(homePageReducer, initialState);

    useEffect(() => {
        const getProducts = async () => {
            dispatch({type: GET_REQUEST});

            try {
                const res = await axios.get("/api/v1/products");
                console.log(res.data)
                dispatch({type: GET_SUCCESS, payload: res.data})
            } catch (error) {
                dispatch({type: GET_ERROR, payload: error.message})
            }
        }

        getProducts();
    },[])
    
    return (
        <div>
            <Title title="HomePage"/>
            <div className="backgroundHomePage">
                <img
                style={{width: "100%"}}
                src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg"
                alt="backgroundHomePage"
                />
            </div>
            <div className="products">
                {
                    state.loading ? (<Loading/>):
                    state.error ? (<MessageBox variant="danger">{state.error}</MessageBox>):
                    (<Products products={state.products}></Products>)
                }
            </div>
        </div>
    )
}

export default HomePage