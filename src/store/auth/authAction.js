import axios from "axios";
import {URL_API} from "../../api/const";

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});
export const authRequestSuccess = (data) => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});
export const authRequestError = (error) => ({
  type: AUTH_REQUEST_ERROR,
  error,
});
export const authLogout = (error) => ({
  type: AUTH_LOGOUT,
});

export const authRequestAsync = () => (dispatch, getState) => {
  const token = getState().tokenReducer.token; // или useSelector(state => state.tokenReducer.token);
  if (!token) return;
  console.log(`authRequestAsync token:.length`, token.length);

  // ? ??? dispatch(authRequest()); // зачем это?

  const url = `${URL_API}/api/v1/me`;

  // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
  // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
  axios(url, {// https://www.reddit.com/dev/api/#GET_api_v1_me
    headers: {
      Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    },
  })
    .then(({data: {name, icon_img: iconImg}}) => {
      const img = iconImg.split('&')[0];
      const data = {name, img};

      dispatch(authRequestSuccess(data));

      const newHref = window.location.href.split('#')[0].replace('/auth', '');
      // console.log('newHref: ', newHref);
      window.history.replaceState(null, null, newHref);
    })
    .catch((err) => {
      console.error(err);
      // setAuth({});
      // ! handleLogout();
      // dispatch(deleteToken());// delToken();
      // dispatch(postsClear());// delToken();

      dispatch(authRequestError(err.message)); // ? err.toString()
    });
};
