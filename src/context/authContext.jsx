// import React from 'react';
import PropTypes from 'prop-types';
import {useAuth} from '../hooks/useAuth';
import { authContext } from './index'

export const AuthContextProvider = ({children}) => {
  const [auth, clearAuth] = useAuth();

  // console.log('AuthContextProvider: ', window.location.toString()); // ? ???

  return (
    <authContext.Provider value={{auth, clearAuth}}>
      {children}
    </authContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
