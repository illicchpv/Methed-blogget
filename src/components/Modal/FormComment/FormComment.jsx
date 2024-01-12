// import React from 'react';
// import { URL_API } from '../../../api/const'
// import { urlAuth } from '../../../api/auth';
// import Text from '../../../UI/Text';
// import { ReactComponent as LoginIcon } from './img/login.svg';
import PropTypes from 'prop-types';
import style from './FormComment.module.css';
import {useContext, useRef} from 'react';
import {authContext} from '../../../context/index';
import Text from '../../../UI/Text/Text';

export const FormComment = () => {
  // console.log('FormComment props:', props);
  const {auth} = useContext(authContext);
  // console.log('auth: ', auth);
  const textareaRef = useRef(null);

  const handleClick = (e) => {
    // console.log('handleClick: ', e.target);
    e.preventDefault();
    const el = textareaRef.current;
    console.log('текст из textarea: 👉', el.value);
    setTimeout(() => {
      el.focus(); el.select();
    }, 0);
  };
  return (
    <>
      <form className={style.form}>
        <Text As='h3' size={14} tsize={18}>{auth.name}</Text>
        <textarea className={style.textarea} ref={textareaRef}></textarea>
        <button className={style.btn}
          onClick={handleClick}
        >Отправить</button>
      </form>
    </>
  );
};

FormComment.propTypes = {
  props: PropTypes.object,
};
