import style from './InfoPost.module.css';
import PropTypes from 'prop-types';
import Text from '../../../../../UI/Text';
import {Link, useParams} from "react-router-dom";

export const InfoPost = (props) => {
  const {title, author, id} = props;
  const {page} = useParams();
  // debugger;

  return (
    <div className={style.content}>
      <Text As='h2' className={style.title}>
        <Link to={`/category/${page}/post/${id}`} className={style.linkPost}>
          <Text size={14} tsize={22} bold className={style.linkPost}>
            {title}
          </Text>
        </Link>
      </Text>
      <Text
        As='a' size={12} tsize={14} medium color='orange'
        className={style.linkAuthor}
        href="#author"
      >{author}
      </Text>
    </div>
  );
};

InfoPost.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
};
