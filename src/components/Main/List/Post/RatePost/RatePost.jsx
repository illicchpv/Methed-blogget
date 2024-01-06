import React from 'react';
import style from './RatePost.module.css';
import PropTypes from 'prop-types';
console.log('PropTypes:', PropTypes);

export const RatePost = (props) => {
  console.log('RatePost props:', props);
  const {ups} = props;
  return (
    <div className={style.rating}>
      <button className={style.up} aria-label="повысить рейтинг"></button>
      <p className={style.ups}>{ups}</p>
      <button className={style.down} aria-label="понизить рейтинг"></button>
    </div>
  );
};

RatePost.propTypes = {
  props: PropTypes.object,
  ups: PropTypes.string,
};
