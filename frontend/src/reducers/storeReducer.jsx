import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD } from "../actions"



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
        case SAVE_SHIPPING_ADDRESS:{
            const {fullName, address, city, postalCode, country} = payload
            
            localStorage.setItem(
                'shippingAddress',
                JSON.stringify({ fullName, address, city, postalCode, country })
            );
            
            return {...state, cart: {...state.cart, shippingAddress: payload}}
        }
        case SAVE_PAYMENT_METHOD:{
            //const {paymentMethodName} = payload;

            localStorage.setItem('paymentMethod', JSON.stringify(payload));
            
            return {...state, cart: {...state.cart, paymentMethod: payload}}
        }

        case REMOVE_FROM_CART:{
            const cartItems = state.cart.cartItems.filter((item) => item._id !== payload._id)
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return {...state, cart:{...state.cart, cartItems}}
        }


        default:
            return state
    }
}

export default storeReducer