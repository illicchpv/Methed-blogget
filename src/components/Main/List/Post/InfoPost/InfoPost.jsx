import React from 'react';
import style from './InfoPost.module.css';
import PropTypes from 'prop-types';
console.log('PropTypes:', PropTypes);

export const InfoPost = (props) => {
  console.log('InfoPost props:', props);
  const {title, author} = props;
  return (
    <div className={style.content}>
      <h2 className={style.title}>
        <a className={style.linkPost} href="#post">
          {title}
        </a>
      </h2>
      <a className={style.linkAuthor} href="#author">{author}</a>
    </div>
  );
};

InfoPost.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  author: PropTypes.string,
};
