import axios from "axios";
import {URL_API} from "../../api/const";

export const POST_INFO_REQUEST = 'POST_INFO_REQUEST';
export const POST_INFO_REQUEST_SUCCESS = 'POST_INFO_REQUEST_SUCCESS';
export const POST_INFO_REQUEST_ERROR = 'POST_INFO_REQUEST_ERROR';

export const postInfoRequest = () => ({
  type: POST_INFO_REQUEST,
});
export const postInfoRequestSuccess = (data) => ({
  type: POST_INFO_REQUEST_SUCCESS,
  data,
});
export const postInfoRequestError = (error) => ({
  type: POST_INFO_REQUEST_ERROR,
  error,
});

export const postInfoRequestAsync = (id) => (dispatch, getState) => {
  const token = getState().tokenReducer.token; // или useSelector(state => state.tokenReducer.token);
  if (!token) return;

  dispatch(postInfoRequest()); // ! это сбрасывает данные и выставляет loading = true

  const url = `${URL_API}/comments/${id}?limit=30`;
  console.log('postInfoRequestAsync: url', url);

  axios(url, {// https://www.reddit.com/dev/api/#GET_api_v1_me
    headers: {
      Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    },
  })
    .then((data) => {
      if (!data || !data.data) return;
      debugger;
      const post = data.data[0].data.children[0].data;

      const children = data.data[1].data.children;
      const c1 = children.map(item => item.data);
      const comments = c1.filter((el) => {
        if (!el.author) return false;
        return true;
      });

      setTimeout(() => {
        dispatch(postInfoRequestSuccess({post, comms: comments}));
      }, 300);
    })
    .catch((err) => {
      dispatch(postInfoRequestError(err.message)); // ? err.toString()
    });
};
/*


*/

