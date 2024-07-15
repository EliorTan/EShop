import { toast } from "react-toastify"
import { ADD_TO_CART, GET_FAIL } from "./actions"
import axios from "axios"


const getError = (err) => {
    const message = (err.message && err.response.data.message ? err.response.data.message : err.message)
    return message
}

const addToCartHandler = async (product, cartItems, ctxDispatch) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    try {
        const { data } = await axios.get(`/api/v1/products/${product._id}`)
        if (data.countInStock < quantity) {
            toast.error('Sorry. Product is out of stock')
            return
        }
        
        ctxDispatch({
            type: ADD_TO_CART,
            payload: { ...product, quantity },
        })
    } catch (error) {
        ctxDispatch({
            type: GET_FAIL,
            payload: getError(error),
        })
    }
}

const getFilterUrl = (searchFormURI, filter, skipPathName) => {
    const searchParams = new URLSearchParams(searchFormURI);
    const category = searchParams.get('category') || 'all';
    const query = searchParams.get('query') || 'all';
    const price = searchParams.get('price') || 'all';
    const rating = searchParams.get('rating') || 'all';
    const order = searchParams.get('order') || 'newest';
    const page = searchParams.get('page') || 1;

    const filterPage = filter.page || page
    const filterCategory = filter.category || category
    const filterQuery = filter.query || query
    const filterPrice = filter.price || price
    const filterRating = filter.rating || rating
    const sortOrder = filter.order || order

    const link = `${skipPathName ? "" : "/search?"}
    category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`


    return link;
}
export {getError, addToCartHandler, getFilterUrl}