import PropTypes from 'prop-types';
import style from './Comments.module.css';
import DatePost from '../../Main/List/Post/DatePost';
import Text from '../../../UI/Text';

export const Comments = (props) => {

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
