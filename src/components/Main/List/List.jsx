import Post from './Post';
import style from './List.module.css';
import { useContext } from 'react';
import { postsContext } from '../../../context/postsContext';

export const List = (props) => {
  let postsData = [
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
  const { posts, setPosts } = useContext(postsContext);
  if(!posts) return;
  if(!posts.data) return;
  // console.log('List==================postsDat: ', posts);
  const children = posts?.data?.children;
  // debugger;
  // console.log('List==================children: ', children);
  const children_data = children.map(el => el.data);
  const datas = children_data.map((el,i) =>{ 
    // console.log('el: ', el.data);
    // if(i < 3) console.log(JSON.stringify(el, null, 2))
    if(el.thumbnail !== 'self') console.log(JSON.stringify(el, null, 2))
    return { 
      thumbnail: (el.thumbnail === 'self' ? '' : el.thumbnail), // el.thumbnail, // ! ??? self
      title: el.title,
      author: el.author,
      ups:  el.ups,
      date:  el.created, // ! надо перевести
      id: el.id,
    }
  });
  postsData = datas;
  // console.log('List==================datas: ', datas);
  

  return (
    <ul className={style.list}>
      {
        postsData.map((el) => <Post key={el.id} postData={el} />)
      }
    </ul>
  );
};

