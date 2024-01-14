
import style from './Modal.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as CloseIcon} from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useCallback, useEffect, useRef} from 'react';
import FormComment from './FormComment';
import Comments from './Comments';
import {usePostInfo} from '../../hooks/usePostInfo';
import Text from '../../UI/Text';

export const Modal = ({closeModal, id}) => { // title, author, markdown,
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const [post, error, loading, comms] = usePostInfo(id);
  let title = 'title loading...'; let author = 'author loading...'; let markdown = 'markdown loading...';
  let comments = [];
  if (post) {
    title = post.title;
    author = post.author;
    if (post.selftext) markdown = post.selftext;
    comments = comms;
  }
  let status = error ? 'error' : (loading ? 'loading' : 'ok');

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
    if (!closeRef.current) return;
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
  useEffect(() => {
    if (!closeRef.current) return;
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);
  useEffect(() => {
    if (!closeRef.current) return;
    closeRef.current.addEventListener('click', handleClick);
    return () => {
      closeRef?.current?.removeEventListener('click', handleClick);
    };
  }, [handleClick]);


  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>

        {status === 'loading' && <h2>Загрузка...</h2>}
        {status === 'error' && <h2>Ошибка!</h2>}
        {status === 'ok' && (
          <>
            <Text As='h2' size={22} tsize={24} className={style.title}>{title}</Text>

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
          </>
        )}

        <button className={style.close} ref={closeRef}>
          <CloseIcon />
        </button>
      </div>
    </div>
    ,
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
