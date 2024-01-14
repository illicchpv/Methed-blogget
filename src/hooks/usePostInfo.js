
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {POST_INFO_REQUEST, POST_INFO_REQUEST_ERROR, POST_INFO_REQUEST_SUCCESS, postInfoRequestAsync} from '../store/postInfo/postInfoAction';

export const usePostInfo = (id) => {
  const token = useSelector(state => state.tokenReducer.token);
  const post = useSelector(state => state.postInfoReducer.post);
  const loading = useSelector(state => state.postInfoReducer.loading);
  const error = useSelector(state => state.postInfoReducer.error);
  const comms = useSelector(state => state.postInfoReducer.comms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postInfoRequestAsync(id));
  }, [token, id]);

  return [post, error, loading, comms];
};
