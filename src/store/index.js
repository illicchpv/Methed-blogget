import {combineReducers, createStore} from "redux";
// import {getToken, setToken} from "../api/token";
import {composeWithDevTools} from '@redux-devtools/extension';
import {commentReducer} from "./commentReducer";
import {tokenReducer} from "./tokenReducer";

const rootReducer = combineReducers({commentReducer, tokenReducer});

export const store = createStore(rootReducer, composeWithDevTools());
