import {createSlice} from "@reduxjs/toolkit";
import {MAX_AUTOLOAD} from "../../api/const";
import {postsRequestAsync} from "./postsAction";

const initialState = {
  loading: null,
  error: '',
  posts: [],
  after: '',
  isLast: false,
  postsSelectedTab: 0,
  autoLoadMaxBlockCnt: MAX_AUTOLOAD,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsClear: (state, action) => {
      state.posts = [];
      state.autoLoadMaxBlockCnt = MAX_AUTOLOAD;
      state.isLast = false;
    },
    postsСhangeSelectedTab: (state, action) => {
      if(state.postsSelectedTab === action.payload) return;
      state.loading = false;
      state.error = '';
      state.after = '';
      state.posts = [];
      state.isLast = false;
      state.postsSelectedTab = action.payload;
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
      let data = action.payload;
      const newPosts = data.children
      state.loading = false;
      state.error = '';
      state.posts = newPosts;
      state.isLast = !data.after || data.after === state.after;
      state.after = data.after;
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
