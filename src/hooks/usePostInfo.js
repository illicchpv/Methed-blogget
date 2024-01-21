import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {
//     POST_INFO_REQUEST, POST_INFO_REQUEST_ERROR, POST_INFO_REQUEST_SUCCESS, postInfoRequestAsync
// } from '../store/postInfo/postInfoAction';
// import {postInfoRequestAsync} from '../store/postInfo/postInfoAction';
import {postInfoRequestAsync} from '../store/postInfo/postInfoSlice';
export const usePostInfo = (id) => {
  const token = useSelector(state => state.tokenReducer.token);
  const {post, comms, loading, error} = useSelector(state => state.postInfoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postInfoRequestAsync(id));
  }, [token, id, dispatch]);

  return [post, error, loading, comms];
};
