import {watchSearchSaga} from "./searchSaga";

export default function* rootSaga(){

  yield watchSearchSaga();
}

/*
import {takeEvery} from 'redux-saga/effects';

function* workerSaga(action){ // смотрящий за действиями
  yield console.log('workerSaga ok');
}

export function* watchSaga(){
  yield takeEvery('SUBMIT', workerSaga);
}

export default function* rootSaga(){

  yield watchSaga();
}
*/

// пример работы с генератором - generator2----------------------
/* 
function* generator2(arr){
  let i = 0;
  while(true){
    yield 'val ' + ++i;
  }
  // for(const n of arr){
  //   yield n;
  // }
  // yield ' value 1';
  // yield ' value 2';
  // yield ' value 3';
}
function root(){
  const iterator = generator2([' value 1',' value 2',' value 3',]);

  console.log('generator2*', iterator.next());
  console.log('generator2*', iterator.next());
  console.log('generator2*', iterator.next());
  console.log('generator2*', iterator.next());
  console.log('generator2*', iterator.next());
  console.log('generator2*', iterator.next());
}
root()
*/