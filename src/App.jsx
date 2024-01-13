import Header from './components/Header';
import Main from './components/Main';
import {AuthContextProvider} from './context/authContext';
import {PostsContextProvider} from './context/postsContext';

// import {Provider, useDispatch} from 'react-redux'; // чтоб передать stor в приложение
import {useDispatch} from 'react-redux'; // чтоб передать stor в приложение
// import {store} from './store';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';

function App() {
  const dispatch = useDispatch();

  dispatch(updateToken(getToken()));

  return (

    <AuthContextProvider>
      <PostsContextProvider>
        <Header />
        <Main />
      </PostsContextProvider>
    </AuthContextProvider>

  );
}
export default App;
