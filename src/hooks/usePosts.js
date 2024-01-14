import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequest, postsRequestAsync, postsRequestSuccess} from '../store/posts/postsAction';
// import { postsContext } from '../context/postsContext';

export const usePosts = (state) => {
  // const [posts, setPosts] = useState({});
  const token = useSelector(state => state.tokenReducer.token);
  const posts = useSelector(state => state.postsReducer.data);
  const loading = useSelector(state => state.postsReducer.loading);
  console.log('loading: ', loading);
  // console.log('posts: ', posts);
  const dispatch = useDispatch();

  // debugger;
  useEffect(() => {
    dispatch(postsRequestAsync());
  }, [token]); // ? ???  тут чего-то не хватает. получается что список постов обновляестя только при изменении token ?

  return [posts, loading];
};
