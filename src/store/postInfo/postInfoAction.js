import {createAsyncThunk} from "@reduxjs/toolkit";
import {URL_API} from "../../api/const";
import axios from "axios";

export const postInfoRequestAsync = createAsyncThunk( // ??? Cannot access 'postsRequestAsync' before initialization
  'postInfo/fetch',
  (id, reduxTK) => {
    const {getState} = reduxTK; // , dispatch

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
        throw err.message;
      }
      );
  }
);
