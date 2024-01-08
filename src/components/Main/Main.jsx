import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';

const Main = (props) => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <List />
    </Layout>
  </main>
);
// Main.propTypes = {
//   children: PropTypes.object,
// };
export default Main;
