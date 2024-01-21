// import {combineReducers, createStore, applyMiddleware} from "redux";
// import {composeWithDevTools} from '@redux-devtools/extension';
import {commentReducer} from "./commentReducer";
import {cutTabReducer} from "./cutTabReducer";
import {tokenMidleware, tokenReducer} from "./tokenReducer";
// import {thunk} from 'redux-thunk';
import {authReducer} from './auth/authReducer';
// import {postsReducer} from './posts/postsReducer';
import postsReducer from './posts/postsSlice';
// import {postInfoReducer} from './postInfo/postInfoReducer';
import postInfoReducer from './postInfo/postInfoSlice';
// import {xDataxReducer} from './xDatax/xDataxReducer'
import {configureStore} from '@reduxjs/toolkit';

// пример включения xDataxReducer   const rootReducer = combineReducers({tokenReducer, authReducer, postsReducer, postInfoReducer, xDataxReducer});
// const rootReducer = combineReducers({
//   cutTabReducer,
//   commentReducer,
//   tokenReducer,
//   authReducer,
//   postsReducer,
//   postInfoReducer
// });

// для примера напишем logger
// const logger = (store) => (next) => (action) => {
//   console.log('logger action: ', action);
//   next(action); // ! иначе дальнейшего прохождения action не будет!
// };

// если бы не было DevTools export const store = createStore(rootReducer, applyMiddleware());
// export const store = createStore(
//   rootReducer,
//   // composeWithDevTools(applyMiddleware(logger)); // для примера напишем логер
//   composeWithDevTools(applyMiddleware(tokenMidleware, thunk))
// );

export const store = configureStore({
  reducer: {
    cutTabReducer,
    commentReducer,
    tokenReducer,
    authReducer,
    postsReducer,
    postInfoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMidleware),

});