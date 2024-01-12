import Header from './components/Header';
import Main from './components/Main';
import {AuthContextProvider} from './context/authContext';
import {PostsContextProvider} from './context/postsContext';
import {TokenContextProvider} from './context/tokenContext';

import {Provider} from 'react-redux'; // чтоб передать stor в приложение
import {store} from './store';

function App() {
  return (
    <Provider store={store}>
      <TokenContextProvider>
        <AuthContextProvider>
          <PostsContextProvider>
            <Header />
            <Main />
          </PostsContextProvider>
        </AuthContextProvider>
      </TokenContextProvider>
    </Provider>
  );
}
export default App;
