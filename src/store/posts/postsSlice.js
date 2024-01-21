import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MAX_AUTOLOAD, POSTS_COUNT, URL_API} from "../../api/const";
import {uniqByKeepFirst} from "../../utils/uniqByKey";
import axios from "axios";
// import {useSelector} from "react-redux";
// import {postsRequestAsync} from "./postsAction"; // ??? Cannot access 'postsRequestAsync' before initialization

export const postsRequestAsync = createAsyncThunk( // ??? Cannot access 'postsRequestAsync' before initialization
  'posts/fetch',
  (newPage, reduxTK) => {
    // console.log('111postsRequestAsync newPage', newPage, 'postsRequestAsync reduxTK: ', reduxTK);
    const {getState, dispatch} = reduxTK;
    // debugger;

    let page = getState().postsReducer.page;
    if (newPage) {
      page = newPage;
      // dispatch(postsSlice.actions.changePage(page));
    }

    // const token = useSelector(state => state.tokenReducer.token);
    const token = getState().tokenReducer.token;
    const {after, isLast} = getState().postsReducer; // loading,
    if (!token || isLast) return;


    // ? ??? почему Макс удаляет это 👇 на 24:25+
    // dispatch(postsSlice.actions.postsRequest()); // ! это сбрасывает данные и выставляет loading = true

    const url = `${URL_API}/${page}?limit=${POSTS_COUNT}${after ? ('&after=' + after) : ''}`;
    // console.log(`>>>postsRequestAsync token.len:[${token.length}] after:[${after}] url: `, url);

    // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
    return axios(url, {// https://www.reddit.com/dev/api/#GET_api_v1_me
      headers: {
        Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
      },
    })
      .then((data) => {
        if (!data || !data.data) return;
        return data.data;

        // if (after) {
        //   // console.log('postsRequestSuccessAfter')
        //   // setTimeout(() => {
        //   //   dispatch(postsSlice.actions.postsRequestSuccessAfter(data.data));
        //   // }, FETCH_TIMEOUT);
        //   return data.data;
        // } else {
        //   // console.log('postsRequestSuccess')
        //   // setTimeout(() => {
        //   //   dispatch(postsSlice.actions.postsRequestSuccess(data.data));
        //   // }, FETCH_TIMEOUT);
        //   return data.data;
        // }
      })
      .catch((err) =>

        // dispatch(postsSlice.actions.postsRequestError(err.message)); // ? err.toString()
        err.message
      );
  }
);

const initialState = {
  loading: null,
  error: '',
  posts: [],
  after: '',
  isLast: false,
  page: '',
  autoLoadMaxBlockCnt: MAX_AUTOLOAD,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequest: (state) => {
      // debugger; // ??? не должно сюда приходить но приходится вызывать чтобы было состояние 'загружается...'
      state.loading = true; state.error = '';
    },
    postsRequestSuccess: (state, action) => {
      // debugger; // не должно сюда приходить
      state.loading = false;
      state.error = '';
      state.posts = action.payload.data.children;
      state.after = action.payload.data.after;
      state.isLast = !action.payload.data.after;
    },
    postsRequestSuccessAfter: (state, action) => {
      // debugger; // не должно сюда приходить
      // ??? state.posts как-то странно выглядит - Proxy(Array) {0: {…}}
      // console.log('state.posts: ', state.posts);
      const len1 = state.posts.length;
      const len2 = action.payload.data.children.length;
      const newPosts = uniqByKeepFirst(
        [
          ...state.posts,
          ...action.payload.data.children
        ], el => el.data.id
      );
      if (newPosts.length !== (len1 + len2)) {
        console.warn(`postsRequestSuccessAfter newPosts.${newPosts.length} !== (${len1} + ${len2}): `);
      }
      state.loading = false;
      state.error = '';
      state.posts = newPosts;
      state.after = action.payload.data.after;
      state.isLast = !action.payload.data.after;
    },
    postsRequestError: (state, action) => {
      // debugger; // не должно сюда приходить
      state.loading = false;
      state.error = action.payload;
    },
    postsClear: (state, action) => {
      state.posts = [];
      state.autoLoadMaxBlockCnt = MAX_AUTOLOAD;
      state.isLast = false;
    },
    changePage: (state, action) => {
      state.loading = false;
      state.error = '';
      state.after = '';
      state.posts = [];
      state.isLast = false;
      state.autoLoadMaxBlockCnt = MAX_AUTOLOAD;
    },
    autoLoadCntInc: (state, action) => {
      state.autoLoadMaxBlockCnt += MAX_AUTOLOAD;
    },
  },
  extraReducers: {
    [postsRequestAsync.pending.type]: (state, action) => {
      // console.log(`postsRequestAsync ${postsRequestAsync.pending.type} action.payload: `, action.payload);
      // debugger;
      state.loading = true;
      state.error = '';
    },
    [postsRequestAsync.fulfilled.type]: (state, action) => {
      // console.log(`postsRequestAsync after:${state.after} ${postsRequestAsync.fulfilled.type} action.payload: `, action.payload);
      if (typeof(action.payload) === 'string') {
        state.loading = false;
        state.error = action.payload;
      } else {
        // state.loading = false;
        // state.error = '';
        // state.posts = action.payload.data.children;
        // state.after = action.payload.data.after;
        // state.isLast = !action.payload.data.after;
        if (!action.payload) return;
        const len1 = state.posts.length;
        const len2 = action.payload.data.children.length;
        const newPosts = uniqByKeepFirst(
          [
            ...state.posts,
            ...action.payload.data.children
          ], el => el.data.id
        );
        if (newPosts.length !== (len1 + len2)) {
          console.warn(`postsRequestSuccessAfter newPosts.${newPosts.length} !== (${len1} + ${len2}): `);
        }
        state.loading = false;
        state.error = '';
        state.posts = newPosts;
        state.after = action.payload.data.after;
        state.isLast = !action.payload.data.after;
      }
    },
    [postsRequestAsync.rejected.type]: (state, action) => {
      // ??? сюда вообще не попадает :(
      // console.log(`postsRequestAsync ${postsRequestAsync.rejected.type} action.payload: `, action.payload);
      // debugger;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
