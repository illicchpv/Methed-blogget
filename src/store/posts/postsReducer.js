import {
  POSTS_REQUEST,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_SUCCESS_AFTER,
  POSTS_REQUEST_ERROR,
  POSTS_CLEAR,
  CHANGE_PAGE,
  AUTOLOAD_INC
} from "./postsAction";
import {uniqByKeepFirst} from "../../utils/uniqByKey";
import {MAX_AUTOLOAD} from "../../api/const";

const initialState = {
  loading: null,
  error: '',
  posts: [],
  after: '',
  isLast: false,
  page: '',
  autoLoadMaxBlockCnt: MAX_AUTOLOAD,
};

// const posts = useSelector(state => state.postsReducer.posts);
export const postsReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state, loading: true, error: '',
        // posts: [] ???
      };
    case POSTS_REQUEST_SUCCESS:{
      return {
        ...state, loading: false, error: '',
        posts: action.data.data.children,
        after: action.data.data.after,
        isLast: !action.data.data.after
      };
    }
    case POSTS_REQUEST_SUCCESS_AFTER: {
      const newPosts = uniqByKeepFirst([...state.posts, ...action.data.data.children], el => el.data.id);
      return {
        ...state, loading: false, error: '',
        posts: newPosts, // [...state.posts, ...action.data.data.children],
        after: action.data.data.after,
        isLast: !action.data.data.after
      };
    }
    case POSTS_REQUEST_ERROR:
      return {
        ...state, loading: false, error: action.error,
        // posts: [] ???
      };
    case POSTS_CLEAR: {
      return {
        ...state, loading: false, error: '',
        posts: [], // ???
        autoLoadMaxBlockCnt: MAX_AUTOLOAD,
      };
    }
    case CHANGE_PAGE:
      return {
        ...state, loading: false, error: '',
        page: action.page,
        after: '',
        posts: [],
        isLast: false,
        autoLoadMaxBlockCnt: MAX_AUTOLOAD,
      };
    case AUTOLOAD_INC: {
      // debugger
      return {
        ...state, loading: false, error: '',
        autoLoadMaxBlockCnt: state.autoLoadMaxBlockCnt + MAX_AUTOLOAD,
      };
    }

    default:
      return state;
  }
};
