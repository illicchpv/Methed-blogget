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
      if (!action.payload) { // ??? а вдруг
        console.warn('postsRequestAsync.fulfilled !action.payload'); return;
      }
      let newPosts = [];
      if(state.page !== action.payload.page){
        newPosts = [...action.payload.data.children];
        state.error = '';
        state.after = '';
        state.posts = [];
        state.isLast = false;
        state.autoLoadMaxBlockCnt = MAX_AUTOLOAD;
      }else{
        const len1 = state.posts.length;
        const len2 = action.payload.data.children.length;
        newPosts = uniqByKeepFirst(
          [
            ...state.posts,
            ...action.payload.data.children
          ], el => el.data.id
        );
        if (newPosts.length !== (len1 + len2)) { // на всякий случай, чтоб не было повторения ключей
          console.warn(`postsRequestSuccessAfter newPosts.${newPosts.length} !== (${len1} + ${len2}): `);
        }
      }
      state.loading = false;
      state.error = '';
      state.posts = newPosts;
      state.isLast = !action.payload.data.after || action.payload.data.after === state.after;
      state.after = action.payload.data.after;
      state.page = action.payload.page;
    },
    [postsRequestAsync.rejected.type]: (state, action) => {
      // ???12 сюда вообще не попадает :(
      // console.log(`postsRequestAsync ${postsRequestAsync.rejected.type} action.payload: `, action.payload);
      // debugger;
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default postsSlice.reducer;
