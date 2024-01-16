import Post from './Post';
import style from './List.module.css';
// import {usePosts} from '../../../hooks/usePosts';
import Preloader from '../../../UI/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from "react";
import {postsRequestAsync} from '../../../store/posts/postsAction';
// import {postsReducer} from "../../../store/posts/postsReducer";

export const List = () => {
  const {posts, loading} = useSelector(state => state.postsReducer); // loading === null ключ что это первая отрисовка
  const endList = useRef(null);
  const after = useSelector(state => state.postsReducer.after);
  const dispatch = useDispatch();

  if (!after) { // (loading === null) {
    dispatch(postsRequestAsync());
  }
  useEffect(() => {
    if (after) { // if (loading !== null) {
      if (!posts || !posts.length || !endList.current) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(postsRequestAsync());
        }
      }, {rootMargin: '100px'});
      observer.observe(endList.current);
    }
  }, [endList.current, posts]);

  const childrenData = posts.map(el => el.data);
  const postsData = childrenData.map((el) => ({
    thumbnail: (el.thumbnail === 'self' ? '' : el.thumbnail),
    title: el.title.replaceAll('&amp;', '&'),
    author: el.author,
    ups: el.ups,
    date: el.created,
    id: el.id,
    selftext: el.selftext, // .replaceAll('&amp;', 'IIII'),
  }));

  return (
    <>
      <ul className={style.list}>
        {
          postsData.map((el) => <Post key={el.id} postData={el} />)
        }
        <li ref={endList} className={style.end}>
          {loading && <Preloader />}
        </li>
      </ul>
    </>
  );
};

