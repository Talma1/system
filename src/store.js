import thunk from 'redux-thunk'; 
import {createStore,  combineReducers, applyMiddleware} from 'redux';
import couponsReducer from './reducers/couponsReducer';
import usersReducer from './reducers/usersReducer';

const store = createStore(
    combineReducers({
        couponsReducer,
        usersReducer
    }),
    {},
    applyMiddleware(thunk)
)


export default store;