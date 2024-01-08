import Header from './components/Header';
import Main from './components/Main';
import { useToken } from './hooks/useToken';

// export const Layout = React.memo( (props) => {
const App = (props) => {
  const [token, clearToken] = useToken('');

  return (<>
    <Header token={token} clearToken={clearToken} />
    <Main>
      <h2>2main.children</h2>
      <h3>3main.children</h3>
      <h4>4main.children</h4>
      <h5>5main.children</h5>
    </Main>
  </>);
};
export default App;
