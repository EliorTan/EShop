import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_CART } from "../actions"



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
        case USER_SIGNOUT:{
         
            return{
                ...state,
                userInfo: null,
                cart: {cartItems: [], shippingAddress: {}, paymentMethod: ''},
                
                }
        }
    }
}

export default storeReducer