import React from 'react';
import style from './Logo.module.css';
import logoImg from './img/logo.svg';

const Logo = (props) => (
  <a className={style.link} href='/'>
    <img className={style.link} src={logoImg} alt='logo Blogget' />
  </a>
);
export default Logo;
