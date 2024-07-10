import { GET_ERROR, GET_REQUEST, GET_SUCCESS } from "../actions";



const homePageReducer = (state,action) => {
    switch (action.type) {
        case GET_REQUEST:
            return {...state, loading: true}
        case GET_SUCCESS:
            return {...state, products: action.payload, loading: false}
        case GET_ERROR:
            return {...state, error: action.payload, loading: false}
        default:
            return state;
    }
}

export default homePageReducer;