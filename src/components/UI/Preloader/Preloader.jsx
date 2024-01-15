// import React from 'react';
// import { URL_API } from '../../../api/const'
// import { urlAuth } from '../../../api/auth';
// import Text from '../../../UI/Text';
// import { ReactComponent as LoginIcon } from './img/login.svg';
import PropTypes from 'prop-types';
import style from './Preloader.module.css';

export const Preloader = (props) => {
  console.log('Preloader props:', props);

  return (
    <div className={style.container}>Preloader</div>
  );
};

Preloader.propTypes = {
  props: PropTypes.object,
};
