// import React from 'react';
import PropTypes from 'prop-types';
import {useToken} from '../hooks/useToken';
import {tokenContext} from './index';

export const TokenContextProvider = ({children}) => {
  const [token, delToken] = useToken('');
  // const [counta, setCounta] = useState(0);
  // setCounta(counta+1);

  // console.log(counta, 'TokenContextProvider: ', window.location.toString()); // ? ???

  return (
    <tokenContext.Provider value={{token, delToken}}>
      {children}
    </tokenContext.Provider>
  );
};

TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
