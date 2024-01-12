import Header from './components/Header';
import Main from './components/Main';
import {AuthContextProvider} from './context/authContext';
import {CommentContextProvider} from './context/commentContext';
import {PostsContextProvider} from './context/postsContext';
import {TokenContextProvider} from './context/tokenContext';
// import { useToken } from './hooks/useToken';

function App() {
  return (
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
  );
}
export default App;
