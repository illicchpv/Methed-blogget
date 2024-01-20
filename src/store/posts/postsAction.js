import axios from "axios";
import {URL_API, POSTS_COUNT, FETCH_TIMEOUT} from "../../api/const";
import {postsSlice} from './postsSlice';
import {createAsyncThunk} from "@reduxjs/toolkit";

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const POSTS_CLEAR = 'POSTS_CLEAR';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const AUTOLOAD_INC = 'AUTOLOAD_INC';

// export const postsRequest = () => ({
//   type: POSTS_REQUEST,
// });
// export const postsRequestSuccess = (data) => ({
//   type: POSTS_REQUEST_SUCCESS,
//   data,
// });
// export const postsRequestSuccessAfter = (data) => ({
//   type: POSTS_REQUEST_SUCCESS_AFTER,
//   data,
// });
// export const postsRequestError = (error) => ({
//   type: POSTS_REQUEST_ERROR,
//   error,
// });
// export const postsClear = () => ({
//   type: POSTS_CLEAR,
// });

// export const changePage = (page) => ({
//   type: CHANGE_PAGE,
//   page,
// });

// export const autoLoadCntInc = (page) => ({
//   type: AUTOLOAD_INC,
// });

export const postsRequestAsync2 = (newPage) => (dispatch, getState) => {
  // debugger;
  let page = getState().postsReducer.page;
  if (newPage) {
    page = newPage;
    dispatch(postsSlice.actions.changePage(page));
  }
  const token = getState().tokenReducer.token; // или useSelector(state => state.tokenReducer.token);
  const after = getState().postsReducer.after;
  const loading = getState().postsReducer.loading;
  const isLast = getState().postsReducer.isLast;

  if (!token || loading || isLast) return;

  dispatch(postsSlice.actions.postsRequest()); // ! это сбрасывает данные и выставляет loading = true

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
          dispatch(postsSlice.actions.postsRequestSuccessAfter(data.data));
        }, FETCH_TIMEOUT);
      } else {
        // console.log('postsRequestSuccess')
        setTimeout(() => {
          dispatch(postsSlice.actions.postsRequestSuccess(data.data));
        }, FETCH_TIMEOUT);
      }
    })
    .catch((err) => {
      dispatch(postsSlice.actions.postsRequestError(err.message)); // ? err.toString()
    });
};

export const postsRequestAsync = createAsyncThunk(
  'posts/fetch',
  (newPage, reduxTK) => {
    console.log('postsRequestAsync newPage', newPage, 'postsRequestAsync reduxTK: ', reduxTK);
    const {getState, dispatch} = reduxTK;

    let page = getState().postsReducer.page;
    if (newPage) {
      page = newPage;
      // dispatch(postsSlice.actions.changePage(page));
    }

    // const token = getState().tokenReducer.token; // или useSelector(state => state.tokenReducer.token);
    // const after = getState().postsReducer.after;
    // const loading = getState().postsReducer.loading;
    // const isLast = getState().postsReducer.isLast;
    const {token, after, loading, isLast} = getState().postsReducer;

    if (!token || loading || isLast) return;

    // ? ??? почему Макс удаляет это 👇 на 24:25+
    dispatch(postsSlice.actions.postsRequest()); // ! это сбрасывает данные и выставляет loading = true

    const url = `${URL_API}/${page}?limit=${POSTS_COUNT}${after ? ('&after=' + after) : ''}`;
    console.log(`postsRequestAsync after:[${after}] url: `, url);

    // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
    return axios(url, {// https://www.reddit.com/dev/api/#GET_api_v1_me
      headers: {
        Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
      },
    })
      .then((data) => {
        if (!data || !data.data) return;

        if (after) {
          // console.log('postsRequestSuccessAfter')
          // setTimeout(() => {
          //   dispatch(postsSlice.actions.postsRequestSuccessAfter(data.data));
          // }, FETCH_TIMEOUT);
          return data.data;
        } else {
          // console.log('postsRequestSuccess')
          // setTimeout(() => {
          //   dispatch(postsSlice.actions.postsRequestSuccess(data.data));
          // }, FETCH_TIMEOUT);
          return data.data;
        }
      })
      .catch((err) => {
        // dispatch(postsSlice.actions.postsRequestError(err.message)); // ? err.toString()
        return err.message;
      });

  });