import axios from "axios";
import {URL_API, POSTS_COUNT, FETCH_TIMEOUT} from "../../api/const";

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const POSTS_CLEAR = 'POSTS_CLEAR';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const AUTOLOAD_INC = 'AUTOLOAD_INC';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});
export const postsRequestSuccess = (data) => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
});
export const postsRequestSuccessAfter = (data) => ({
  type: POSTS_REQUEST_SUCCESS_AFTER,
  data,
});
export const postsRequestError = (error) => ({
  type: POSTS_REQUEST_ERROR,
  error,
});
export const postsClear = () => ({
  type: POSTS_CLEAR,
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page,
});

export const autoLoadCntInc = (page) => ({
  type: AUTOLOAD_INC,
});

export const postsRequestAsync = (newPage) => (dispatch, getState) => {
  let page = getState().postsReducer.page;
  if (newPage) {
    page = newPage
    dispatch(changePage(page));
  }
  const token = getState().tokenReducer.token; // или useSelector(state => state.tokenReducer.token);
  const after = getState().postsReducer.after;
  const loading = getState().postsReducer.loading;
  const isLast = getState().postsReducer.isLast;

  if (!token || loading || isLast) return;

  dispatch(postsRequest()); // ! это сбрасывает данные и выставляет loading = true

  const url = `${URL_API}/${page}?limit=${POSTS_COUNT}${after ? ('&after=' + after) : ''}`;
  console.log(`postsRequestAsync after:[${after}] url: `, url);

  // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
  // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
  axios(url, {// https://www.reddit.com/dev/api/#GET_api_v1_me
    headers: {
      Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    },
  })
    .then((data) => {
      if (!data || !data.data) return;

      if (after) {
        // console.log('postsRequestSuccessAfter')
        setTimeout(() => {
          dispatch(postsRequestSuccessAfter(data.data));
        }, FETCH_TIMEOUT);
      } else {
        // console.log('postsRequestSuccess')
        setTimeout(() => {
          dispatch(postsRequestSuccess(data.data));
        }, FETCH_TIMEOUT);
      }
    })
    .catch((err) => {
      dispatch(postsRequestError(err.message)); // ? err.toString()
    });
};
