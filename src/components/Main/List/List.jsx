import Post from './Post';
import style from './List.module.css';
import {usePosts} from '../../../hooks/usePosts';

export const List = (props) => {
  const [posts, loading] = usePosts();
  if (!posts || !posts.data) return;
  const children = posts?.data?.children;
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

  return (
    <>
      {loading ? (<h1>Posts loading...</h1>) :
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

