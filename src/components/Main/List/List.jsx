import Post from './Post';
import style from './List.module.css';
import {usePosts} from '../../../hooks/usePosts';
import Preloader from '../../../UI/Preloader';

export const List = (props) => {
  const [posts, loading] = usePosts();
  console.log('List loading: ', loading);
  if (!posts) return;
  const children = posts?.data?.children ?? [];
  const childrenData = children.map(el => el.data);
  // let tnCnt = 0;

  const postsData = childrenData.map((el, i) => {
    if (el.thumbnail !== 'self') {
      // tnCnt++;
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
    };
  });
  // console.log('List component -- count el.thumbnail !== "self":', tnCnt, 'postsData.length:', postsData.length);

  // const is_loading = true;
  return (
    <>
      {loading ? (
        <div className={style.PreloaderContainer}>
          <Preloader />
          <Preloader />
          <Preloader />
          <Preloader />
          <Preloader />
        </div>
      ) :
        (
          <ul className={style.list}>
            {
              postsData.map((el) => <Post key={el.id} postData={el} />)
            }
          </ul>
        )}
    </>
  );
};

