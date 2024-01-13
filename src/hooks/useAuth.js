import {useEffect} from 'react';
import {URL_API} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store/tokenReducer';
import {authLogout, authRequest, authRequestAsync, authRequestError, authRequestSuccess} from '../store/auth/authAction';
import axios from 'axios';

export const useAuth = () => {
  // const [auth, setAuth] = useState({});
  const auth = useSelector(state => state.authReducer.data);
  const loading = useSelector(state => state.authReducer.loading);
  // const [logoutVisible, setLogoutVisible] = useState(false);
  const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token]);

  const clearAuth = () => {
    // setAuth({});
    dispatch(authLogout());
  };

  return [auth, loading, clearAuth];
};
