// import React from 'react';
// import { URL_API } from '../../../api/const'
// import { urlAuth } from '../../../api/auth';
// import Text from '../../../UI/Text';
// import { ReactComponent as LoginIcon } from './img/login.svg';
import ClockLoader from "react-spinners/ClockLoader";
import PropTypes from 'prop-types';
import style from './Preloader.module.css';

export const Preloader = (props) => {
  console.log('Preloader props:', props);

  return (
    <ClockLoader color='#cc6633' 
    cssOverride={{display: 'block'}} 
    size={30} />
  );
};

Preloader.propTypes = {
  props: PropTypes.object,
};
