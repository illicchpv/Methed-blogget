import {combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';
import {commentReducer} from "./commentReducer";
import {tokenMidleware, tokenReducer} from "./tokenReducer";
import {thunk} from 'redux-thunk';
import {authReducer} from './auth/authReducer'
import {postsReducer} from './posts/postsReducer'
import {postInfoReducer} from './postInfo/postInfoReducer'
// import {xDataxReducer} from './xDatax/xDataxReducer'

// пример включения xDataxReducer   const rootReducer = combineReducers({tokenReducer, authReducer, postsReducer, postInfoReducer, xDataxReducer});
const rootReducer = combineReducers({commentReducer, tokenReducer, authReducer, postsReducer, postInfoReducer});

// для примера напишем logger
// const logger = (store) => (next) => (action) => {
//   console.log('logger action: ', action);
//   next(action); // ! иначе дальнейшего прохождения action не будет!
// };

// если бы не было DevTools export const store = createStore(rootReducer, applyMiddleware());
export const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(logger)); // для примера напишем логер
  composeWithDevTools(applyMiddleware(tokenMidleware, thunk))
);
