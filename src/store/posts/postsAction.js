import axios from "axios";
import {URL_API} from "../../api/const";

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});
export const postsRequestSuccess = (data) => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
});
export const postsRequestError = (error) => ({
  type: POSTS_REQUEST_ERROR,
  error,
});

export const postsRequestAsync = () => (dispatch, getState) => {
  const token = getState().tokenReducer.token; // или useSelector(state => state.tokenReducer.token);
  if (!token) return;
  console.log(`postsRequestAsync token:.length`, token.length);

  dispatch(postsRequest()); // ! это сбрасывает данные и выставляет loading = true

  const url = `${URL_API}/best?limit=30`;
  console.log('url: ', url);
  // const url = `${URL_API}/best/.json?limit=30`;
  // const url = `https://oauth.reddit.com/best`;
  // const url = `https://oauth.reddit.com/best?limit=100`;
  // console.log('usePosts fetch url: ', url, `Authorization: bearer ${token}`);

  // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
  // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
  axios(url, {// https://www.reddit.com/dev/api/#GET_api_v1_me
    headers: {
      Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    },
  })
    .then((data) => {
      if (!data || !data.data) return;
      dispatch(postsRequestSuccess(data.data));
    })
    .catch((err) => {
      dispatch(postsRequestError(err.message)); // ? err.toString()
    });
};
