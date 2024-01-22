import {createSlice} from "@reduxjs/toolkit";
import {postInfoRequestAsync} from "./postInfoAction";

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
    [postInfoRequestAsync.pending.type]: (state, action) => {
      console.log(`postInfoRequestAsync ${postInfoRequestAsync.pending.type} action.payload: `, action.payload);
      state.loading = true;
      state.post = {};
      state.error = '';
      state.comms = [];
    },
    [postInfoRequestAsync.fulfilled.type]: (state, action) => {
      console.log(`postInfoRequestAsync ${postInfoRequestAsync.fulfilled.type} action.payload: `, action.payload);
      state.loading = false;
      state.post = action.payload.post;
      state.error = '';
      state.comms = action.payload.comms;
    },
    [postInfoRequestAsync.rejected.type]: (state, action) => {
      console.log(`postInfoRequestAsync ${postInfoRequestAsync.rejected.type} action.payload: `, action.payload);
      state.loading = false;
      state.post = {};
      state.error = action.error.message;
      state.comms = [];
    },
  },
});

export default postInfoSlice.reducer;
