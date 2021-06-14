import { compose, createStore, applyMiddleware } from "redux";
import reducer from '../reducers/reducer';
import thunk from "redux-thunk";
import promiseMiddleware from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

/*
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
*/

const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;