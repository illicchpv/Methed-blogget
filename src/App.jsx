import Header from './components/Header';
import Main from './components/Main';
import {useDispatch} from 'react-redux'; // чтоб передать stor в приложение
// import {store} from './store';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';

// import {store} from './store';
// const time = () => dispatch => {
//   dispatch({type: 'START'});
//   setTimeout(() => {
//     dispatch({type: 'END'});
//   }, 3000);
// };

function App() {
  const dispatch = useDispatch();

  dispatch(updateToken(getToken()));

  // проверка 'redux-thunk' на setTimeout
  // store.dispatch(time());

  return (

    <>
      <Header />
      <Main />
    </>

  );
}
export default App;
