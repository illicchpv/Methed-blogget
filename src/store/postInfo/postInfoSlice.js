import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MAX_AUTOLOAD, POSTS_COUNT, URL_API} from "../../api/const";
import {uniqByKeepFirst} from "../../utils/uniqByKey";
import axios from "axios";
import {useSelector} from "react-redux";

export const postInfoRequestAsync = createAsyncThunk( // ??? Cannot access 'postsRequestAsync' before initialization
  'postInfo/fetch',
  (id, reduxTK) => {
    const {getState, dispatch} = reduxTK;

    const token = getState().tokenReducer.token;

    if (!token) return;

    // dispatch(postInfoRequest()); // ! это сбрасывает данные и выставляет loading = true
  
    const url = `${URL_API}/comments/${id}?limit=30`;
    console.log('postInfoRequestAsync: url', url);
  
    return axios(url, {// https://www.reddit.com/dev/api/#GET_api_v1_me
      headers: {
        Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
      },
    })
      .then((data) => {
        if (!data || !data.data) return;
        const post = data.data[0].data.children[0].data;
  
        const children = data.data[1].data.children;
        const c1 = children.map(item => item.data);
        const comments = c1.filter((el) => {
          if (!el.author) return false;
          return true;
        });
  
        return {post, comms: comments};
        // setTimeout(() => {
        //   dispatch(postInfoRequestSuccess({post, comms: comments}));
        // }, 300);
      })
      .catch((err) => {
        // dispatch(postInfoRequestError(err.message)); // ? err.toString()
        return err.message;
      });
  }
);

const initialState = {
  post: {},
  loading: false,
  error: '',
  comms: []
};

export const postInfoSlice = createSlice({
  name: 'postInfo',
  initialState,
  reducers: {},
  extraReducers: {
    [postInfoRequestAsync.pending.type]: (state, action) =>{
      console.log(`postInfoRequestAsync ${postInfoRequestAsync.pending.type} action.payload: `, action.payload);
      state.loading = true;
      state.post = {}; 
      state.error = ''; 
      state.comms = [];
    },
    [postInfoRequestAsync.fulfilled.type]: (state, action) =>{
      console.log(`postInfoRequestAsync ${postInfoRequestAsync.fulfilled.type} action.payload: `, action.payload);
      state.loading = false;
      state.post = action.payload.post;
      state.error = '';
      state.comms = action.payload.comms;
    },
    [postInfoRequestAsync.rejected.type]: (state, action) =>{
      console.log(`postInfoRequestAsync ${postInfoRequestAsync.rejected.type} action.payload: `, action.payload);
      state.loading = false;
      state.post = {};
      state.error = action.payload;
      state.comms = [];
    },
  },
});

export default postInfoSlice.reducer;