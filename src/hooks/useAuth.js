import {useEffect} from 'react';
import {URL_API} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store/tokenReducer';
import {authLogout, authRequest, authRequestError, authRequestSuccess} from '../store/auth/action';
import axios from 'axios';

export const useAuth = () => {
  // const [auth, setAuth] = useState({});
  const auth = useSelector(state => state.authReducer.data);
  // const [logoutVisible, setLogoutVisible] = useState(false);
  const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    console.log(`token:.length`, token.length);

    dispatch(authRequest());

    // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
    axios(`${URL_API}/api/v1/me`, {// https://www.reddit.com/dev/api/#GET_api_v1_me
      headers: {
        Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
      },
    })
      .then(({data: {name, icon_img: iconImg}}) => {
        const img = iconImg.split('&')[0];
        // console.log(`iconImg, name:`, img, name, iconImg);
        const data = {name, img};
        // setAuth(data);

        dispatch(authRequestSuccess(data));

        const newHref = window.location.href.split('#')[0].replace('/auth', '');
        // console.log('newHref: ', newHref);
        window.history.replaceState(null, null, newHref);
      })
      .catch((err) => {
        console.error(err);
        // setAuth({});
        // ! handleLogout();
        dispatch(deleteToken());// delToken();

        dispatch(authRequestError(err.message)); // ? err.toString()
      });
  }, [token]);

  const clearAuth = () => {
    // setAuth({});
    dispatch(authLogout());
  };

  return [auth, clearAuth];
};
