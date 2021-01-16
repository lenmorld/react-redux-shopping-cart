import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, SORT_PRODUCTS_BY_PRICE } from "../types"

// returns a function (thunk) that accepts a dispatch
// (we are using redux-thunk for this)

// the actions logic here are from App.js
// which was using setState before
export const fetchProducts = () => async (dispatch) => {
    // dispatch action
    const res = await fetch("/api/products")
    const data = await res.json()

    dispatch({
        type: FETCH_PRODUCTS,
        payload: data // payload is the result here
    })
}

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: size ? products.filter(product =>
                product.availableSizes.includes(size)) : products
        }
    })
}

export const sortProducts = (products, sort) => (dispatch) => {
    dispatch({
        type: SORT_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: [...products].sort((a, b) => {
                if (sort === "lowest") {
                    return a.price > b.price ? 1 : -1;
                } else if (sort === "highest") {
                    return a.price < b.price ? 1 : -1;
                } else {
                    return a._id > b._id ? 1 : -1;
                }
            })
        }
    })
}