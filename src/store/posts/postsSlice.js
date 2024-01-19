import {createSlice} from "@reduxjs/toolkit";
import {MAX_AUTOLOAD} from "../../api/const";
import {uniqByKeepFirst} from "../../utils/uniqByKey";

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
      state.loading = true; state.error = '';
    },
    postsRequestSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.posts = action.payload.data.children;
      state.after = action.payload.data.after;
      state.isLast = !action.payload.data.after;
    },
    postsRequestSuccessAfter: (state, action) => {
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
      if(newPosts.length !== (len1 + len2)){
        console.warn(`postsRequestSuccessAfter newPosts.${newPosts.length} !== (${len1} + ${len2}): `);
      }
      state.loading = false;
      state.error = '';
      state.posts = newPosts;
      state.after = action.payload.data.after;
      state.isLast = !action.payload.data.after;
    },
    postsRequestError: (state, action) => {
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
      state.autoLoadMaxBlockCnt = state.autoLoadMaxBlockCnt + MAX_AUTOLOAD;
    },
  },
});

export default postsSlice.reducer;
