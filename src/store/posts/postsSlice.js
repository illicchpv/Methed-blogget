import {createSlice} from "@reduxjs/toolkit";
import {MAX_AUTOLOAD} from "../../api/const";
import {uniqByKeepFirst} from "../../utils/uniqByKey";
import {postsRequestAsync} from "./postsAction";

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
      // ???12 state.posts как-то странно выглядит - Proxy(Array) {0: {…}}
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
      // ???12 сюда вообще не попадает :(
      // console.log(`postsRequestAsync ${postsRequestAsync.rejected.type} action.payload: `, action.payload);
      // debugger;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
