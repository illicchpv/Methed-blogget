import {AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_ERROR, AUTH_LOGOUT} from "./action";

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const authReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case AUTH_REQUEST:
      return {...state, loading: true, data: {}, error: ''};
    case AUTH_REQUEST_SUCCESS:
      return {...state, loading: false, data: action.data, error: ''};
    case AUTH_REQUEST_ERROR:
      return {...state, loading: false, data: {}, error: action.error};
    case AUTH_LOGOUT:
      return {...state, loading: false, data: {}, error: ''};

    default:
      return state;
  }
};
