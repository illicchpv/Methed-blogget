// import {combineReducers, createStore, applyMiddleware} from "redux";
// import {composeWithDevTools} from '@redux-devtools/extension';
import {commentReducer} from "./commentReducer";
// import {cutTabReducer} from "./cutTabReducer";
import {tokenMidleware, tokenReducer} from "./tokenReducer";
// import {thunk} from 'redux-thunk';
import {authReducer} from './auth/authReducer';
// import {postsReducer} from './posts/postsReducer';
import postsReducer from './posts/postsSlice';
// import {postInfoReducer} from './postInfo/postInfoReducer';
import postInfoReducer from './postInfo/postInfoSlice';
import {searchReducer} from "./search/searchReducer";
// import {xDataxReducer} from './xDatax/xDataxReducer'
import {configureStore} from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    // cutTabReducer,
    commentReducer,
    tokenReducer,
    authReducer,
    postsReducer,
    postInfoReducer,
    searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMidleware, sagaMiddleware),

});

sagaMiddleware.run(rootSaga);
