const { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, SORT_PRODUCTS_BY_PRICE } = require("../types");

/**
 * @param {*} state current state
 * @param {*} action 
    updates to the Store are determined by
    - action.type: what kind of update - FETCH, ADD, DELETE, ...
    - action.payload: the updates to apply, if any
             essentially spread on top of (current) state
   @returns updates to the store
 */
export const productsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            // start state when fetching data from server, no filter
            return { items: action.payload, filteredItems: action.payload }
        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items
            }
        case SORT_PRODUCTS_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items
            }
        default:
            return state;
    }
}