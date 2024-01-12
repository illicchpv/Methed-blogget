
import {useContext, useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context';
// import { postsContext } from '../context/postsContext';

export const useCommentsData = (id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {token} = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    const url = `${URL_API}/comments/${id}?limit=30`;
    // const url = `${URL_API}/best?limit=30`;
    console.log('useCommentsData: url', url);
    setLoading(true);
    fetch(url, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(resp => {
        // console.log(`----------resp:`, resp);
        if (resp.status === 401) {
          throw new Error('Сервер вернул ошибку: ', resp.statusText);
        }
        return resp.json();
      })
      .then(
        ([
          {
            data: {
              children: [{data: post}],
            },
          },
          {
            data: {
              children,
            },
          },
        ]) => {
          // debugger;
          const c1 = children.map(item => item.data);
          const comments = c1.filter((el) => {
            if (!el.author) {
              return false;
            }
            return true;
          });
          setData([post, comments]);
        },
      )
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, id]);

  return [data, error, loading];
};

/*
export const useCommentsData = (state) => {
  const [data, setData] = useState({})
  const { token } = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    const url = `${URL_API}/best?limit=30`;
    // const url = `${URL_API}/best/.json?limit=30`;
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
        if (!data) return
        // console.log('usePosts ----------- setPosts(data): ', data);
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  return [posts, setPosts];
};
*/
