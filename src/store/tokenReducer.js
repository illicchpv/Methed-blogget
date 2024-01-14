// import {getToken, setToken} from "../api/token";
import {useDispatch} from "react-redux";
import {setToken} from "../api/token";
import {postsClear} from "./posts/postsAction";

const UPDATE_TOKEN = 'UPDATE_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

const initialState = {
  // token: getToken(),
  token: '',
};

export const updateToken = (token) => ({type: UPDATE_TOKEN, token});
export const deleteToken = () => ({type: DELETE_TOKEN, token: ''});

export const tokenMidleware = (store) => (next) => (action) => {
  if (action.type === UPDATE_TOKEN) {
    setToken(action.token);
  }
  if (action.type === DELETE_TOKEN) {
    // window.location.reload(); // ? ??? без этого после logout список постов не обновляется 
    setToken('');
  }

  next(action);
};

export const tokenReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case UPDATE_TOKEN:
      // setToken(action.token);
      return {...state, token: action.token};
    case DELETE_TOKEN:
      // setToken('');
      return {...state, token: ''};

    default:
      return state;
  }
};