import {MAX_AUTOLOAD} from "../../api/const";
import {SEARCH_REQUEST, SEARCH_REQUEST_ERROR, SEARCH_REQUEST_SUCCESS} from "./searchAction";

const initialState = {
  loading: null,
  error: '',
  posts: [],
  after: '',
  isLast: false,
  postsSelectedTab: 0,
  autoLoadMaxBlockCnt: MAX_AUTOLOAD,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case SEARCH_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        posts: action.posts,
        after: action.after,
      };
    }
    case SEARCH_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default: return state;
  }

};