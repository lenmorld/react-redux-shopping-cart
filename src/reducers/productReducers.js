const { FETCH_PRODUCTS } = require("../types");

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
            return { items: action.payload }
        default:
            return state;
    }
}