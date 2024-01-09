import Header from './components/Header';
import Main from './components/Main';
import { AuthContextProvider } from './context/authContext';
import { TokenContextProvider, tokenContext } from './context/tokenContext';
import { useToken } from './hooks/useToken';

function App() {

  return (
    <TokenContextProvider>
      <AuthContextProvider>
        <Header />
        <Main />
      </AuthContextProvider>
    </TokenContextProvider>
  );
};
export default App;
