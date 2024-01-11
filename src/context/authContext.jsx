import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

export const authContext = React.createContext({}); // ? ???warning  Fast refresh only works when a file only exports components.
export const AuthContextProvider = ({children}) => {
  const [auth, clearAuth] = useAuth();

  console.log('AuthContextProvider: ', window.location.toString());

  return (
    <authContext.Provider value={{auth, clearAuth}}>
      {children}
    </authContext.Provider>
  )
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
