// import React from 'react';
// import { URL_API } from '../../../api/const'
// import { urlAuth } from '../../../api/auth';
// import Text from '../../../UI/Text';
// import { ReactComponent as LoginIcon } from './img/login.svg';
import PropTypes from 'prop-types';
import style from './Comments.module.css';
// import formatDate from '../../utils/formatDate';
import DatePost from '../../Main/List/Post/DatePost';
import Text from '../../../UI/Text';

export const Comments = (props) => {
  console.log('Comments props:', props);
  // const {body, author, created: date} = props;
  // console.log('date: ', date);

  // debugger;
  return (
    <>
      {props.comments.map((el) => {
        const {id, body, author, created: date} = el;
        return (
          <ul key={id} className={style.list}>
            <li className={style.item}>
              <Text As='h3' className={style.author} size={18} tsize={22}>{author}</Text>
              <Text As='p' className={style.comment} size={14} tsize={18}>{body}</Text>
              <DatePost date={date} />
            </li>
          </ul>
        );
      })}
    </>

  );
};

Comments.propTypes = {
  props: PropTypes.object,
  // body: PropTypes.string,
  // author: PropTypes.string,
  // created: PropTypes.number,
};
/*

          <div className={style.container}>
            <div className="body">{body}</div>
            <div className="author">{author}</div>
            <div className="created">{formatDate(date)}</div>
            <hr />
          </div>

      <div className={style.container}>
        <div className="body">{body}</div>
        <div className="author">{author}</div>
        <div className="created">{formatDate(date)}</div>
      </div>
*/
