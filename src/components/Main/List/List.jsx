/* eslint-disable max-len */
import React from 'react';
import Post from './Post';
import style from './List.module.css';

export const List = (props) => {
  // console.log('List props:', props);
  const postsData = [
    {
      thumbnail: '',
      title: 'Title long long long long long long long long long long long long',
      author: 'Nickname',
      ups: 2,
      date: '2024-01-01T01:05:00.000Z',
      id: '11',
    },
    {
      thumbnail: '',
      title: 'Title Title',
      author: 'Nickname',
      ups: 12,
      date: '2024-01-01T01:05:00.000Z',
      id: '22',
    },
  ];

  return (
    // <div className={style.container}>List</div>
    <ul className={style.list}>
      {
        postsData.map((el) => <Post key={el.id} postData={el} />)
      }
    </ul>
  );
};

