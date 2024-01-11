import Post from './Post';
import style from './List.module.css';
import { useContext } from 'react';
import { postsContext } from '../../../context/postsContext';

export const List = (props) => {
  // let postsData = [
  //   {
  //     thumbnail: '',
  //     title: 'Title long long long long long long long long long long long long',
  //     author: 'Nickname',
  //     ups: 2,
  //     date: '2024-01-01T01:05:00.000Z',
  //     id: '11',
  //   },
  //   {
  //     thumbnail: '',
  //     title: 'Title Title',
  //     author: 'Nickname',
  //     ups: 12,
  //     date: '2024-01-01T01:05:00.000Z',
  //     id: '22',
  //   },
  // ];
  const { posts } = useContext(postsContext);
  if (!posts || !posts.data) return;
  // console.log('List==================postsDat: ', posts);
  const children = posts?.data?.children;
  const childrenData = children.map(el => el.data);
  let tnCnt = 0; // ? ??? warning  'tnCnt' is assigned a value but never used  no-unused-vars

  const postsData = childrenData.map((el, i) => {
    if (el.thumbnail !== 'self') {
      tnCnt++;
      // console.log(JSON.stringify(el, null, 2));
    }
    return {
      thumbnail: (el.thumbnail === 'self' ? '' : el.thumbnail), // el.thumbnail, // ! ??? self
      title: el.title,
      author: el.author,
      ups: el.ups,
      date: el.created,
      id: el.id,
      selftext: el.selftext,
    }
  });
  // console.log('List component -- count el.thumbnail !== "self":', tnCnt, 'postsData.length:', postsData.length)

  return (
    <ul className={style.list}>
      {
        postsData.map((el) => <Post key={el.id} postData={el} />)
      }
    </ul>
  );
};

