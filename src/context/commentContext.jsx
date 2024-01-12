// import React from 'react';
import PropTypes from 'prop-types';
import {commentContext} from './index';
import {useState} from 'react';

export const CommentContextProvider = ({children}) => {
  const [value, setValue] = useState('');

  return (
    <commentContext.Provider value={{value, setValue}}>
      {children}
    </commentContext.Provider>
  );
};

commentContext.propTypes = {
  children: PropTypes.node.isRequired,
};
