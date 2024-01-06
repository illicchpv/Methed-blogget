import React from 'react';
import PropTypes from 'prop-types';
import style from './Heading.module.css';

const Heading = (props) => (
  <div className={style.heading}>
    {props.text}
  </div>
);
Heading.propTypes = {
  text: PropTypes.string,
};
export default Heading;
