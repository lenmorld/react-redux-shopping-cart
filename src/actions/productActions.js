import { FETCH_PRODUCTS } from "../types"

// returns a function (thunk) that accepts a dispatch
export const fetchProducts = () => async (dispatch) => {
    // dispatch action
    const res = await fetch("/api/products")
    const data = await res.json()

    dispatch({
        type: FETCH_PRODUCTS,
        payload: data // payload is the result here
    })
}