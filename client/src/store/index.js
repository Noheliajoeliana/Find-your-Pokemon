import { createStore, applyMiddleware } from "redux";
import Reducer from "../reducers/index.js"; //necesito crear el reducer 
import thunk from "redux-thunk";

export const store = createStore(Reducer, //esto me da el reducer
    applyMiddleware(thunk)); //esto me deja hacer cosas asíncronas 

export default store;