import {POST_INFO_REQUEST, POST_INFO_REQUEST_SUCCESS, POST_INFO_REQUEST_ERROR} from "./postInfoAction";

const initialState = {
  post: {},
  loading: false,
  error: '',
  comms: []
};

export const postInfoReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case POST_INFO_REQUEST:
      return {...state, loading: true, post: {}, error: '', comms: []};
    case POST_INFO_REQUEST_SUCCESS:
      return {...state, loading: false, post: action.data.post, error: '', comms: action.data.comms};
    case POST_INFO_REQUEST_ERROR:
      return {...state, loading: false, post: {}, error: action.error, comms: []};

    default:
      return state;
  }
};
