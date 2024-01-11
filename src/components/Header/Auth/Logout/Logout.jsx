// import React from 'react';
import style from './Logout.module.css';
import PropTypes from 'prop-types';

export const Logout = (props) => {
  // console.log('Logout props:', props);
  const {logout} = props;

  return (
    <button className={style.logout}
      onClick={() => {
        logout();
      }}
    >Logout</button>
  );
};
Logout.propTypes = {
  props: PropTypes.object,
  setToken: PropTypes.func,
};
