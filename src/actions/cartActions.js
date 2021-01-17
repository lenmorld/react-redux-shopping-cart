import { ADD_TO_CART, REMOVE_FROM_CART } from "../types"

export const addToCart = (product) => (dispatch, getState) => {
    const items = getState().cart.cartItems;
    if (items.find(item => item._id === product._id)) {
        console.error("already in cart")
    } else {
        const cartItems = [...items, {
            ...product,
            count: 1
        }]

        dispatch({
            type: ADD_TO_CART,
            payload: {
                cartItems
            }
        })

        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
}

// export const removeFromCart = (items, product) => (dispatch) => {
export const removeFromCart = (product) => (dispatch, getState) => {
    const items = getState().cart.cartItems;
    const cartItems = items.filter(item => item._id !== product._id)

    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            cartItems
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}