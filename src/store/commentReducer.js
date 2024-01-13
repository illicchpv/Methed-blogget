import {getToken, setToken} from "../api/token";

const UPDATE_COMMENT = 'UPDATE_COMMENT';

const initialState = {
  comment: 'Привет Redux',
};

export const updateComment = (comment) => ({type: UPDATE_COMMENT, comment});

export const commentReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case UPDATE_COMMENT:
      return {...state, comment: action.comment};

    default:
      return state;
  }
};
