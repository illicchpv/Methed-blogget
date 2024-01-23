
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR';

export const searchRequest = (searchText) => {
// export const searchRequest = ({token, searchText}) => {
  return {
    type: SEARCH_REQUEST,
    // token,
    searchText,
  };
};
export const searchRequestSuccess = (data) => {
  return {
    type: SEARCH_REQUEST_SUCCESS,
    posts: data.data.children,
    after: data.data.after,
  };
};
export const searchRequesError = (error) => {
  return {
    type: SEARCH_REQUEST_ERROR,
    error: error.message,
  };
};
