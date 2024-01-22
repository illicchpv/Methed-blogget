import Post from './Post';
import style from './List.module.css';
// import {usePosts} from '../../../hooks/usePosts';
import Preloader from '../../../UI/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from "react";
// import {autoLoadCntInc, postsRequestAsync} from '../../../store/posts/postsAction'; // ??? Cannot access 'postsRequestAsync' before initialization
import {postsRequestAsync} from '../../../store/posts/postsAction';
import {Outlet, useParams} from "react-router-dom";
import {POSTS_COUNT} from "../../../api/const";
import {postsSlice} from '../../../store/posts/postsSlice';
// import {postsReducer} from "../../../store/posts/postsReducer";

export const List = () => {
  const auth = useSelector(state => state.authReducer.data);
  const {posts, loading, autoLoadMaxBlockCnt, error} = useSelector(state => state.postsReducer); // loading === null ключ что это первая отрисовка
  // console.log('error: ', error);
  const autoLoadCnt = posts ? Math.round(posts.length / POSTS_COUNT) : 0;
  const endList = useRef(null);
  const after = useSelector(state => state.postsReducer.after);
  const dispatch = useDispatch();
  const {page} = useParams();
  // console.log('List page: ', page);  // ??? а тут показывает page?
  // const [autoLoadCnt, setAutoLoadCnt] = useState(0);

  // console.log(`${autoLoadCnt}/${autoLoadMaxBlockCnt} List page: ${page}  [${loading}]  [${after}] `, new Date().getTime())

  useEffect(() => {
    // console.log('useEffect postsRequestAsync')
    dispatch(postsRequestAsync(page));
  }, [page]);

  // ???12 что-то тут каша какая-то
  useEffect(() => {
    let observer = undefined;
    if (after && !loading) { // if (loading !== null) {
      // console.log('after: ', after, loading, !posts);
      // if (!posts || !posts.length || !endList.current) return;

      // console.log(`IntersectionObserver: 1 ${autoLoadCnt} < ${autoLoadMaxBlockCnt} `);
      if (autoLoadCnt < autoLoadMaxBlockCnt) {
        // setAutoLoadCnt((p) => p++);
        // dispatch(autoLoadCntInc())
        // console.log('IntersectionObserver: 2');

        observer = new IntersectionObserver((entries) => {
          // console.log('IntersectionObserver: 31');
          if (entries[0].isIntersecting) {
            // console.log('IntersectionObserver: 32');
            dispatch(postsRequestAsync(page));
          }
        }, {rootMargin: '100px'});
        if (endList.current) observer.observe(endList.current);
      }
    }
    return () => {
      if (endList.current && observer) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current, posts, posts.length, autoLoadMaxBlockCnt]);

  const childrenData = posts.map(el => el.data);
  let postsData = childrenData.map((el) => ({
    thumbnail: (el.thumbnail === 'self' ? '' : el.thumbnail),
    title: el.title.replaceAll('&amp;', '&'),
    author: el.author,
    ups: el.ups,
    date: el.created,
    id: el.id,
    selftext: el.selftext, // .replaceAll('&amp;', 'IIII'),
  }));
  postsData = postsData === undefined ? [] : postsData;

  const s = <span>{autoLoadCnt}/{autoLoadMaxBlockCnt} по {POSTS_COUNT}</span>;
  // console.log('after: ', after, 'loading:', loading);

  return (
    <>
      {auth.name && (<>
        <ul className={style.list}>
          {
            postsData.map((el) => <Post key={el.id} postData={el} />)
          }
          <li className={style.end}>
            {autoLoadCnt < autoLoadMaxBlockCnt && (!error && (<>

              {s}
              {(after !== null && loading) && 
                <button className={style.continue} onClick={() => {
                  dispatch(postsSlice.actions.autoLoadCntInc());
                }}><Preloader /> загрузить еще {s}</button>
              }
            </>))}
            {autoLoadCnt >= autoLoadMaxBlockCnt && (after &&
              <button className={style.continue} onClick={() => {
                dispatch(postsSlice.actions.autoLoadCntInc());
              }}> загрузить еще {s}</button>
            )}
            {error && <h2 className={style.error}>{error}</h2>}
          </li>
          <li ref={endList} className={style.end2}></li>
        </ul>
        <Outlet />
      </>)}
    </>
  );
};

