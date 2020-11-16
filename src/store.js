import thunk from 'redux-thunk'; 
import {createStore,  combineReducers, applyMiddleware} from 'redux';
import usersReducer from './reducers/usersReducer';

const store = createStore(
    combineReducers({
        usersReducer
    }),
    {},
    applyMiddleware(thunk)
)


export default store;