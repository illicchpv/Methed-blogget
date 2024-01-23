import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {URL_API} from '../api/const';
import axios from 'axios';
import {SEARCH_REQUEST, searchRequesError, searchRequestSuccess} from './search/searchAction';

// const fetchSearch = async (searchText, token) => {
//   const url = `${URL_API}/search?q=${searchText}&limit=3`;
//   console.log(`token:${token.length} fetchSearch: url`, url);
//   const request = await axios(url,
//     {
//       headers: {
//         Authorization: `bearer ${token}`,
//       },
//     }
//   );
//   return request;
// };
// 👇 для // const data = yield fetchSearch(action);
// const fetchSearch = async (action) => {
//   const url = `${URL_API}/search?q=${action.searchText}&limit=3`;
//   console.log(`token:${action.token.length} fetchSearch: url`, url);
//   const request = await axios(url,
//     {
//       headers: {
//         Authorization: `bearer ${action.token}`,
//       },
//     }
//   );
//   return request.data;
// };

function* workerSearch(action) {
  const token = yield select(state => state.tokenReducer.token); // можно так получить значения из state
  const {data} = yield call(fetchSearch, action.searchText, token);
  // const data = yield fetchSearch(action);
  yield put(searchRequestSuccess(data)); // put заменяет dispatch
  // console.log('workerSearch data: ', data);
}

function* fetchSearch(searchText){
  const token = yield select(state => state.tokenReducer.token);
  const url = `${URL_API}/search?q=${searchText}&limit=3`;
  console.log(`token:${token.length} fetchSearch: url`, url);

  try{
    const request = yield axios(url,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    yield put(searchRequestSuccess(request.data));

  }catch(e){
    yield put(searchRequesError(e));
  }
};

// можно вызывать fetchSearch без workerSearch но тогда он должен быть генератором* и не асинхронным
export function* watchSearchSaga() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
// export function* watchSearchSaga() {
//   // yield takeEvery(SEARCH_REQUEST, workerSearch); // бубут отрабатываться все запросы.
//   yield takeLatest(SEARCH_REQUEST, workerSearch); // будет отработан только последний. остальные прервутся
// }
