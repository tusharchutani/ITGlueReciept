import { createStore } from 'redux';
import rootReducer from '../reducers';
var defaultState = {};


function configigureStore(initialState=defaultState){
    var store = createStore(rootReducer, initialState, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    return store;
}

export default configigureStore;