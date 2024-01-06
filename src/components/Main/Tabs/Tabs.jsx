import React from 'react';
import style from './Tabs.module.css';

export const Tabs = (props) => {
  console.log('Tabs props:', props);
  return (
    // <div className={style.container}>Tabs</div>
    <ul className={style.list}>
      <li><a href="/" >Главная</a></li>
      <li><a href="/" >Просмотренные</a></li>
      <li><a href="/" >Сохранённые</a></li>
      <li><a href="/" >Мои посты</a></li>
    </ul>
  );
};

