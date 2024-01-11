// import React from 'react';
import PropTypes from 'prop-types';
// import { URL_API } from '../../../api/const'
// import { urlAuth } from '../../../api/auth';
// import Text from '../../../UI/Text';
// import { ReactComponent as LoginIcon } from './img/login.svg';
import style from './Modal.module.css';
import { ReactComponent as CloseIcon } from './img/close.svg'
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';

export const Modal = (props) => {
  const { title, author, markdown } = props;

  return ReactDOM.createPortal(
    <div className={style.overlay}>
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

        <button className={style.close}>
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
};
