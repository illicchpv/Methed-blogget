import Post from './Post';
import style from './List.module.css';
// import {usePosts} from '../../../hooks/usePosts';
import Preloader from '../../../UI/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from "react";
import {autoLoadCntInc, postsRequestAsync} from '../../../store/posts/postsAction';
import {Outlet, useParams} from "react-router-dom";
import {POSTS_COUNT} from "../../../api/const";
import {postsSlice} from '../../../store/posts/postsSlice';
// import {postsReducer} from "../../../store/posts/postsReducer";

export const List = () => {
  const auth = useSelector(state => state.authReducer.data);
  const {posts, loading, autoLoadMaxBlockCnt, realNewState} = useSelector(state => state.postsReducer); // loading === null ключ что это первая отрисовка
  const autoLoadCnt = posts ? Math.round(posts.length / POSTS_COUNT) : 0;
  const endList = useRef(null);
  const after = useSelector(state => state.postsReducer.after);
  const dispatch = useDispatch();
  const {page} = useParams();
  // console.log('List page: ', page);  // ??? а тут показывает page?
  // const [autoLoadCnt, setAutoLoadCnt] = useState(0);

  // console.log(`${autoLoadCnt}/${autoLoadMaxBlockCnt} List page: ${page}  [${loading}]  [${after}] `, new Date().getTime())

  // if (!after) { // (loading === null) {
  //   dispatch(postsRequestAsync());
  // }

  useEffect(() => {
    // console.log('useEffect postsRequestAsync')
    dispatch(postsRequestAsync(page));
  }, [page]);

  useEffect(() => {
    let observer = undefined;
    if (after && !loading) { // if (loading !== null) {
      if (!posts || !posts.length || !endList.current) return;

      if (autoLoadCnt < autoLoadMaxBlockCnt) {
        // setAutoLoadCnt((p) => p++);
        // dispatch(autoLoadCntInc())

        observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            dispatch(postsRequestAsync());
          }
        }, {rootMargin: '100px'});
        observer.observe(endList.current);
      }
    }
    return () => {
      if (endList.current && observer) {
        observer.unobserve(endList.current);
      }
    };
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

  const s = <span>{autoLoadCnt}/{autoLoadMaxBlockCnt} по {POSTS_COUNT}</span>;
  return (
    <>
      {auth.name && (<>
        <ul className={style.list}>
          {
            postsData.map((el) => <Post key={el.id} postData={el} />)
          }
          <li ref={endList} className={style.end}>
            {autoLoadCnt < autoLoadMaxBlockCnt && (loading && (<><Preloader />{s}</>))}
            {autoLoadCnt >= autoLoadMaxBlockCnt && (after &&
              <button className={style.continue} onClick={() => {
                dispatch(postsSlice.actions.autoLoadCntInc());
                // ??? при попытке получить ещё посты - вылетает 👇
                // setTimeout(() => {
                //   debugger;
                //   dispatch(postsSlice.actions.postsRequestAsync());
                // }, 1)
              }}> загрузить еще {s}</button>
            )}
          </li>
        </ul>
        <Outlet />
      </>)}
    </>
  );
};

