import Title from '../components/shared/Title.jsx';
import {useReducer} from 'react';
import homePageReducer from '../reducers/homePageReducer.jsx';
import { GET_REQUEST, GET_SUCCESS, GET_ERROR } from '../actions.jsx';
import axios from 'axios';
import { useEffect } from 'react';

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
                const res = await axios.get("http://localhost:8080/api/v1/products");
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
            <div>
                <img
                style={{width: "100%"}}
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="backgroundHomePage"
                />
            </div>
            <div className="products">
                {
                    //TODO: Loading and MessageBox
                    // state.loading ? (<Loading/>):
                    // state.error ? (<MessageBox variant="danger">{state.error}</MessageBox>):
                    // (<div>products here</div>)
                }
            </div>
        </div>
    )
}

export default HomePage