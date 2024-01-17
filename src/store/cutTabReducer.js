// import {getToken, setToken} from "../api/token";

const SET_CUR_TAB = 'SET_CUR_TAB';

const initialState = {
  curTabName: 'Главная',
};

export const setTabName = (curTabName) => ({type: SET_CUR_TAB, curTabName});

export const cutTabReducer = (state = initialState, action) => { // преобразователь состояний
  switch (action.type) {
    case SET_CUR_TAB: {
      // debugger;
      return {...state, curTabName: action.curTabName};
    }

    default:
      return state;
  }
};
