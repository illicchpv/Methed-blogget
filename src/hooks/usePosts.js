import { useContext, useEffect, useState } from 'react';
import { URL_API } from '../api/const';
import { tokenContext } from '../context/tokenContext';
// import { postsContext } from '../context/postsContext';

export const usePosts = (state) => {
  const [posts, setPosts] = useState({});
  const { token } = useContext(tokenContext);

  useEffect(() => {
    if(!token) return;

    const url = `${URL_API}/best?limit=7`;
    // const url = `https://oauth.reddit.com/best`;
    // const url = `https://oauth.reddit.com/best?limit=100`;
    // console.log('usePosts fetch url: ', url, `Authorization: bearer ${token}`);

    fetch(url, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(resp => {
        // console.log(`----------resp:`, resp);
        if (resp.status === 401) {
          throw new Error('Сервер вернул ошибку: ', resp.statusText)
        }
        return resp.json();
      })
      .then(data => {
        if(!data) return
        console.log('usePosts ----------- setPosts(data): ', data);
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [token]);

  return [posts, setPosts];
};
