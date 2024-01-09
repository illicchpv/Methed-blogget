import Header from './components/Header';
import Main from './components/Main';
import { AuthContextProvider } from './context/authContext';
import { tokenContext } from './context/tokenContext';
import { useToken } from './hooks/useToken';

function App() {
  const [token, delToken] = useToken('');

  return (
    <tokenContext.Provider value={{ token, delToken }}>
      <AuthContextProvider>
        <Header />
        <Main />
      </AuthContextProvider>
    </tokenContext.Provider>
  );
};
export default App;
