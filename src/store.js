import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { productsReducer } from './reducers/productReducers'

const initialState = {}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combineReducers({
    products: productsReducer,
}),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

/*
 combineReducers - gather results into a single object
 initialState
 enhancer - composed middlewares
    1. thunk - to handle async
        since inside our actions we are using async requests to get data
    
    2. dev tools - for chrome
        send all info about redux store to monitor in dev tools
        default to compose

    compose middlewares together then apply
*/

export default store