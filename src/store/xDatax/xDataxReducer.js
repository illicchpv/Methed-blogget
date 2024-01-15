import {XDATAX_REQUEST, XDATAX_REQUEST_ERROR, XDATAX_REQUEST_SUCCESS} from "./xDataxAction";

const initialState = {
  data: {},
  loading: false,
  error: '',
};

export const xDataxReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case XDATAX_REQUEST:
      return {...state, loading: true, data: {}, error: ''};
    case XDATAX_REQUEST_SUCCESS:
      return {...state, loading: false, data: action.data, error: ''};
    case XDATAX_REQUEST_ERROR:
      return {...state, loading: false, data: {}, error: action.error};

    default:
      return state;
  }
};
