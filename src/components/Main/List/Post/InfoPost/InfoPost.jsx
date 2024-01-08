import style from './InfoPost.module.css';
import PropTypes from 'prop-types';
import Text from '../../../../../UI/Text';

export const InfoPost = (props) => {
  const {title, author} = props;
  return (
    <div className={style.content}>
      <Text As='h2' className={style.title}>
        <Text As='a' size={18} tsize={24} className={style.linkPost} href="#post">
          {title}
        </Text>
      </Text>
      <Text
        As='a' size={12} tsize={14} color='orange'
        className={style.linkAuthor}
        href="#author">{author}</Text>
    </div>
  );
};

InfoPost.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  author: PropTypes.string,
};
