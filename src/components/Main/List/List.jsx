/* eslint-disable max-len */
import React from 'react';
import Post from './Post';
import style from './List.module.css';

export const List = (props) => {
  console.log('List props:', props);
  const postData = {
    thumbnail: '',
    title: 'Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title ',
    author: 'Nickname',
    ups: 2,
    date: '2024-01-01T01:05:00.000Z',
  };

  return (
    // <div className={style.container}>List</div>
    <ul className={style.list}>
      <Post postData={postData} />
    </ul>
  );
};

