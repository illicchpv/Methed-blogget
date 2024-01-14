import {POSTS_REQUEST, POSTS_REQUEST_SUCCESS, POSTS_REQUEST_ERROR} from "./postsAction";

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const postsReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case POSTS_REQUEST:
      return {...state, loading: true, data: {}, error: ''};
    case POSTS_REQUEST_SUCCESS:
      return {...state, loading: false, data: action.data, error: ''};
    case POSTS_REQUEST_ERROR:
      return {...state, loading: false, data: {}, error: action.error};

    default:
      return state;
  }
};
