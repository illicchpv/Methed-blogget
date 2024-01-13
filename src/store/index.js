import {combineReducers, createStore, applyMiddleware} from "redux";
// import {getToken, setToken} from "../api/token";
import {composeWithDevTools} from '@redux-devtools/extension';
import {commentReducer} from "./commentReducer";
import {tokenMidleware, tokenReducer} from "./tokenReducer";

const rootReducer = combineReducers({commentReducer, tokenReducer});

// // для примера напишем логер
// const logger = (store) => (next) => (action) => {
//   console.log('logger action: ', action);
//   next(action); // ! иначе дальнейшего прохождения action не будет!
// };

// если бы не было DevTools export const store = createStore(rootReducer, applyMiddleware());
export const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(logger)); // для примера напишем логер
  composeWithDevTools(applyMiddleware(tokenMidleware))
);
