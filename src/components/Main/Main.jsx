import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import {Route, Routes} from "react-router-dom";
import Modal from "../Modal";

const Main = (props) => (
  <main className={style.main}>
    <Layout>
      <Tabs/>
      <Routes>
        <Route path='/' element={
          <div className={style.headerPage}>
            <h1>Стартовая страница</h1>
            <h2>добро пожаловать</h2>
            <h3>Выберите категорию</h3>
          </div>
        }/>

        <Route path='/category/:page' element={<List/>}>
          <Route path='post/:id' element={<Modal/>}/>
        </Route>

        <Route path='*' element={
          <div className={style.errorPage}>
            <h1>404</h1>
          </div>
        }/>
      </Routes>
    </Layout>
  </main>
);
// Main.propTypes = {
//   children: PropTypes.object,
// };
export default Main;
/*

 <Outlet /> ???

      {isModalOpen && <Modal id={id}
                             closeModal={() => {
                               setIsModalOpen(false);
                             }}/>}

*/
