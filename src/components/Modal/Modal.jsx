
import style from './Modal.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as CloseIcon} from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useCallback, useEffect, useRef} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
// import {getRedditRezArray} from '../utils/getRedditRezArray';
import FormComment from './FormComment';
import Comments from './Comments';

export const Modal = ({closeModal, id}) => { // title, author, markdown,
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const [data, loading] = useCommentsData(id); // data, error, loading
  // console.log('loading: ', loading);
  // console.log('error: ', error);

  let title = 'title loading...'; let author = 'author loading...'; let markdown = 'markdown loading...';
  let comments = [];
  if (data) {
    title = data[0].title;
    author = data[0].author;
    markdown = data[0].selftext;

    // console.log('data: ', data[1]);
    comments = data[1];
  }
  // if (data) {
  //   console.log(`Modal data id=${id} data: `, data);
  //   {
  //     console.log('data[0]: ', data[0]);
  //     const {title: t, author: a, selftext: m} = data[0];
  //     console.log('m: ', m);
  //     console.log('a: ', a);
  //     console.log('t: ', t);
  //   }
  // }

  const handleClick = useCallback((e) => {
    const target = e.target;
    if (target === overlayRef.current || target === closeRef.current || target.closest('button') === closeRef.current) {
      closeModal();
    }
  }, [closeModal]);
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') closeModal();
  }, [closeModal]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);
  useEffect(() => {
    closeRef.current.addEventListener('click', handleClick);
    return () => {
      closeRef?.current?.removeEventListener('click', handleClick);
    };
  }, [handleClick]);


  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <h2 className={style.title}>{title}</h2>

        <div className={style.content}>
          <Markdown options={{
            overrides: {
              a: {
                props: {
                  target: '_blank',
                }
              }
            }
          }}>{markdown}</Markdown>
        </div>

        <p className={style.author}>{author}</p>

        {!loading && <FormComment />}

        {loading && <p>“Loading”</p>}
        {(!loading && comments.length > 0) && <Comments comments={comments} />}
        {(!loading && comments.length === 0) && <p>“Нет комментариев”</p>}

        <button className={style.close} ref={closeRef}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func,
};
