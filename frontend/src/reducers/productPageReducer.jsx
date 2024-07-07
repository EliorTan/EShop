


const productPageReducer = (state,{type, payload}) => {

    switch (type) {
        case "GET_REQUEST":
            return {...state, loading: true}
        case "GET_SUCCESS":
            return {...state, product: payload, loading: false}
        case "GET_ERROR":
            return {...state, error: payload, loading: false}
        default:
            return state;
    }

}



export default productPageReducer