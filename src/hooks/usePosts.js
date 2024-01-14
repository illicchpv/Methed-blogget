import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequest, postsRequestAsync, postsRequestSuccess} from '../store/posts/postsAction';

export const usePosts = (state) => {
  const token = useSelector(state => state.tokenReducer.token);
  const posts = useSelector(state => state.postsReducer.data);
  const loading = useSelector(state => state.postsReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsRequestAsync());
  }, [token]); // ? ???  тут чего-то не хватает. получается что список постов обновляется только при изменении token ?

  return [posts, loading];
};
