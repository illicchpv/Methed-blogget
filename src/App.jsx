import Header from './components/Header';
import Main from './components/Main';
import {AuthContextProvider} from './context/authContext';
import {CommentContextProvider} from './context/commentContext';
import {PostsContextProvider} from './context/postsContext';
import {TokenContextProvider} from './context/tokenContext';
// import { useToken } from './hooks/useToken';
import {createStore} from 'redux';
import {Provider} from 'react-redux'; // чтоб передать stor в приложение

const initialState = {comment: 'Привет Redux'};
const rootReducer = (state = initialState, action) => { // преобразователь состояний
  return state;
};
const store = createStore(rootReducer);
function App() {
  return (
    <Provider store={store}>
      <TokenContextProvider>
        <AuthContextProvider>
          <PostsContextProvider>
            <CommentContextProvider>
              <Header />
              <Main />
            </CommentContextProvider>
          </PostsContextProvider>
        </AuthContextProvider>
      </TokenContextProvider>
    </Provider>
  );
}
export default App;
