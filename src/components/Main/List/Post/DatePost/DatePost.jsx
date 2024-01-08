import React from 'react';
import style from './DatePost.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../../utils/formatDate.js';

export const DatePost = (props) => {
  const {date} = props;
  return (
    <time className={style.date} dateTime={date}>{formatDate(date)}</time>
  );
};

DatePost.propTypes = {
  props: PropTypes.object,
  date: PropTypes.string,
};
