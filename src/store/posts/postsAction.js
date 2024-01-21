import {createAsyncThunk} from "@reduxjs/toolkit";
import {POSTS_COUNT, URL_API} from "../../api/const";
import axios from "axios";
import postsSlice from "./postsSlice";

export const postsRequestAsync = createAsyncThunk( // ??? Cannot access 'postsRequestAsync' before initialization
  'posts/fetch',
  (newPage, reduxTK) => {
    // console.log('111postsRequestAsync newPage', newPage, 'postsRequestAsync reduxTK: ', reduxTK);
    const {getState, dispatch} = reduxTK; // , dispatch
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


    // ? ??? почему Макс удаляет это 👇 на 24:25+  // если его включить, то посты не грузятся
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
      })
      .catch((err) =>
        // dispatch(postsSlice.actions.postsRequestError(err.message)); // ? err.toString()
        err.message
      );
  }
);
