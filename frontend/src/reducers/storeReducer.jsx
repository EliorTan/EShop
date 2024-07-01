import { USER_SIGNIN } from "../actions"



const storeReducer = (state, {type, payload}) => {
    switch (type) {
        case USER_SIGNIN:{
            return{...state, userInfo: payload}
        }
        case ADD_TO_CART:{
            const newItem = payload;
            const existingItems = state.cart.cartItems.find((item) => item._id === newItem._id)
            const cartItems = existingItems
            ? state.cart.cartItems.map((item) => item._id === existingItems._id ? newItem : item) 
            : [...state.cart.cartItems, newItem]

            localStorage.setItem('cartItems', JSON.stringify(cartItems))

            return {...state, cart: {...state.cart, cartItems}}
        }
    }
}

export default storeReducer