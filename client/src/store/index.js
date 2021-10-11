import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "../reducers/index.js"; //necesito crear el reducer 
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    Reducer, //esto me da el reducer
    composeEnhancer(applyMiddleware(thunk))
); //esto me deja hacer cosas asíncronas 

export default store;