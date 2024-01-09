import { useEffect, useState } from 'react';
import { URL_API } from '../api/const';

export const useAuth = (token) => {
  const [auth, setAuth] = useState({});
  const [logoutVisible, setLogoutVisible] = useState(false);

  useEffect(() => {
    if (!token) return;
    console.log(`token:`, token.length);

    // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
    fetch(`${URL_API}/api/v1/me`, {// https://www.reddit.com/dev/api/#GET_api_v1_me
      headers: {
        Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
      },
    })
      .then(resp => {
        // console.log(`----------resp:`, resp);
        if(resp.status === 401) {
          throw new Error('Сервер вернул ошибку: ', resp.statusText)
        }
        return resp.json();
      })
      .then(({ name, icon_img: iconImg }) => {
        const img = iconImg.split('&')[0];
        console.log(`iconImg, name:`, img, name, iconImg);
        setAuth({ name, img });

        const newHref = window.location.href.split('#')[0];
        console.log('newHref: ', newHref);
        // console.log('window.location.href: ', window.location.href);
        window.history.replaceState(null, null, newHref);
      })
      .catch((err) => {
        console.error(err);
        // ! handleLogout();
      });
  }, [token]);

  const clearAuth = () => {
    setAuth({});
  };

  return [auth, clearAuth];
};
