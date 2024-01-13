import {getToken, setToken} from "../api/token";

const UPDATE_TOKEN = 'UPDATE_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

const initialState = {
  token: getToken(),
};

export const updateToken = (token) => ({type: UPDATE_TOKEN, token});
export const deleteToken = () => ({type: DELETE_TOKEN, token: ''});

export const tokenReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case UPDATE_TOKEN:
      setToken(action.token);
      return {...state, token: action.token};
    case DELETE_TOKEN:
      setToken('');
      return {...state, token: ''};

    default:
      return state;
  }
};
