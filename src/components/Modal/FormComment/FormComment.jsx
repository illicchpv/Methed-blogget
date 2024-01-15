// import React from 'react';
// import { URL_API } from '../../../api/const'
// import { urlAuth } from '../../../api/auth';
// import Text from '../../../UI/Text';
// import { ReactComponent as LoginIcon } from './img/login.svg';
import PropTypes from 'prop-types';
import style from './FormComment.module.css';
// import {useContext} from 'react';
// import {authContext} from '../../../context/index';
import Text from '../../../UI/Text/Text';
import {useDispatch, useSelector} from 'react-redux';
import {updateComment} from '../../../store/commentReducer';
import {useAuth} from '../../../hooks/useAuth';

export const FormComment = () => {
  // console.log('FormComment props:', props);
  // const {auth} = useContext(authContext);
  const [auth] = useAuth();
  // console.log('auth: ', auth);
  // const textareaRef = useRef(null);

  // const store = useStore();
  // const value = store.getState().comment;
  const value = useSelector(state => state.commentReducer.comment);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // setValue(e.target.value);
    dispatch(updateComment(e.target.value));
  };
  const handleSubmit = (e) => {
    // console.log('handleSubmit: ', e.target);
    e.preventDefault();
    console.log('текст из textarea: 👉', value);
    // const el = textareaRef.current;
    // console.log('текст из textarea: 👉', el.value);
    // setTimeout(() => {
    //   el.focus(); el.select();
    // }, 0);
  };
  return (
    <>
      <form className={style.form}>
        <Text As='h3' size={14} tsize={18}>{auth.name}</Text>
        <textarea className={style.textarea}
          // ref={textareaRef}
          value={value}
          onChange={handleChange}
        ></textarea>
        <button className={style.btn}
          onClick={handleSubmit}
        >Отправить</button>
      </form>
    </>
  );
};

FormComment.propTypes = {
  props: PropTypes.object,
};
