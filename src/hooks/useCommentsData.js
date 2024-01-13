
import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {useSelector} from 'react-redux';
// import { postsContext } from '../context/postsContext';

export const useCommentsData = (id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.tokenReducer.token);
  // const dispatch = useDispatch();

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
