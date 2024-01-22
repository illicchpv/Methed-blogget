import {createAsyncThunk} from "@reduxjs/toolkit";
import {LIST, POSTS_COUNT, URL_API} from "../../api/const";
import axios from "axios";
import {uniqByKeepFirst} from "../../utils/uniqByKey";

export const postsRequestAsync = createAsyncThunk( // ??? Cannot access 'postsRequestAsync' before initialization
  'posts/fetch',
  (newPage, reduxTK) => {   // ???12 newPage берётся из useDispatch(); URL надо бы избавиться непонятно как
    // console.log('111postsRequestAsync newPage', newPage, 'postsRequestAsync reduxTK: ', reduxTK);
    const {getState, dispatch} = reduxTK; // , dispatch

    const token = getState().tokenReducer.token;
    let {postsSelectedTab, after, isLast, posts} = getState().postsReducer; // loading,
    if (!token || isLast) return;

    const page = LIST[postsSelectedTab].link;

    // ? ???12 почему Макс удаляет это 👇 на 24:25+  // если его включить, то посты не грузятся
    // dispatch(postsSlice.actions.postsRequest()); // ! это сбрасывает данные и выставляет loading = true
    const url = `${URL_API}/${page}?limit=${POSTS_COUNT}${after ? ('&after=' + after) : ''}`;
    console.log(`>>>postsRequestAsync page:${page} token.len:[${token.length}] after:[${after}] url: `, url);

    // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
    return axios(url, {// https://www.reddit.com/dev/api/#GET_api_v1_me
      headers: {
        Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
      },
    })
      .then((data) => {
        if (!data || !data.data) return;

        const rezData = data.data.data;
        const rezPosts = data.data.data.children;

        const len1 = posts.length;
        const len2 = rezPosts.length;
        const newPosts = uniqByKeepFirst(
          [
            ...posts,
            ...rezPosts
          ], el => el.data.id
        );
        if (newPosts.length !== (len1 + len2)) { // на всякий случай, чтоб не было повторения ключей
          console.warn(`postsRequestSuccessAfter newPosts.${newPosts.length} !== (${len1} + ${len2}): `);
        }
        rezData.children = newPosts;

        return rezData;
      })
      .catch((err) => {
        // dispatch(postsSlice.actions.postsRequestError(err.message)); // ? err.toString()
        throw err.message;
      }
      );
  }
);
