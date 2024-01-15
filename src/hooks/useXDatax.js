import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {xDataxRequestAsync} from '../store/xDatax/xDataxAction';
// import {xDataxReducer} from "../store/xDatax/xDataxReducer";
export const useXDatax = (id) => {
  const {data, loading, error} = useSelector(state => state.xDataxReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(xDataxRequestAsync(id));
  }, [id, dispatch]);

  return [data, error, loading];
};
