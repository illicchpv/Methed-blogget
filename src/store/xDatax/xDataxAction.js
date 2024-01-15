import axios from "axios";
import {URL_API} from "../../api/const";

export const XDATAX_REQUEST = 'XDATAX_REQUEST';
export const XDATAX_REQUEST_SUCCESS = 'XDATAX_REQUEST_SUCCESS';
export const XDATAX_REQUEST_ERROR = 'XDATAX_REQUEST_ERROR';

export const xDataxRequest = () => ({type: XDATAX_REQUEST});
export const xDataxRequestSuccess = (data) => ({type: XDATAX_REQUEST_SUCCESS, data});
export const xDataxRequestError = (error) => ({type: XDATAX_REQUEST_ERROR, error});

export const xDataxRequestAsync = (id) => (dispatch, getState) => {
  // if (!какие - то необходимые условия) return;

  dispatch(xDataxRequest()); // ! это сбрасывает данные и выставляет loading = true

  const url = `${URL_API}/comments/${id}?limit=30`;
  axios(url, {
    // headers: {Authorization: `bearer ${token}`},
  })
    .then((data) => {
      if (!data || !data.data) return;

      setTimeout(() => {
        dispatch(xDataxRequestSuccess(data.data));
      }, 300);
    })
    .catch((err) => {
      dispatch(xDataxRequestError(err.message)); // ? err.toString()
    });
};
