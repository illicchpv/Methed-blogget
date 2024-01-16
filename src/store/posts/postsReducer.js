import {POSTS_REQUEST, POSTS_REQUEST_SUCCESS, POSTS_REQUEST_SUCCESS_AFTER, POSTS_REQUEST_ERROR, POSTS_CLEAR} from "./postsAction";
import {uniqByKeepFirst} from "../../utils/uniqByKey";

const initialState = {
  loading: null,
  error: '',
  posts: [],
  after: '',
};

// const posts = useSelector(state => state.postsReducer.posts);
export const postsReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state, loading: true, error: '',
        // posts: [] ???
      };
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state, loading: false, error: '',
        posts: action.data.data.children,
        after: action.data.data.after,
        isLast: !action.data.data.after
      };
    case POSTS_REQUEST_SUCCESS_AFTER:
      const newPosts = uniqByKeepFirst([...state.posts, ...action.data.data.children], el => {
        return el.data.id
      })
      return {
        ...state, loading: false, error: '',
        posts: newPosts, // [...state.posts, ...action.data.data.children],
        after: action.data.data.after,
        isLast: !action.data.data.after
      };
    case POSTS_REQUEST_ERROR:
      return {
        ...state, loading: false, error: action.error,
        // posts: [] ???
      };
    case POSTS_CLEAR:
      return {
        ...state, loading: false, error: '',
        // posts: [] ???
      };

    default:
      return state;
  }
};
