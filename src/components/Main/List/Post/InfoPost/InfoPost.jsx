import style from './InfoPost.module.css';
import PropTypes from 'prop-types';
import Text from '../../../../../UI/Text';
import {useState} from 'react';
import Modal from '../../../../Modal';

export const InfoPost = (props) => {
  const {title, author, id} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // debugger;

  return (
    <div className={style.content}>
      <Text As='h2' className={style.title}>
        <Text As='a' size={18} tsize={24} className={style.linkPost}
          href="#post"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {title}
        </Text>
      </Text>
      <Text
        As='a' size={12} tsize={14} color='orange'
        className={style.linkAuthor}
        href="#author"
      >{author}
      </Text>
      {/* title={title} author={author} markdown={markdown}  */}
      {isModalOpen && <Modal id={id}
        closeModal={() => {
          setIsModalOpen(false);
        }} />}
    </div>
  );
};

InfoPost.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
};
