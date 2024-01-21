import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postInfoRequestAsync} from '../store/postInfo/postInfoAction';

export const usePostInfo = (id) => {
  const token = useSelector(state => state.tokenReducer.token);
  const {post, comms, loading, error} = useSelector(state => state.postInfoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postInfoRequestAsync(id));
  }, [token, id, dispatch]);

  return [post, error, loading, comms];
};
