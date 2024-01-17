import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import Modal from "../Modal";
import {useEffect} from 'react';

const Main = (props) => {
  const {page} = useParams();
  const navigate = useNavigate();
  console.log('Main page: ', page, window.location.href); // ??? почему не показывает page?

  useEffect(() => {
    if (window.location.href.includes("/auth#")) {
      navigate(`/`);
    }
  }, []);

  return (
    <main className={style.main}>
      <Layout>
        <Tabs />
        <Routes>
          {["/", "/auth"].map((path, index) =>
            <Route path={path} element={
              <div className={style.headerPage}>
                <h1>Стартовая страница</h1>
                <h2>добро пожаловать</h2>
                <h3>Выберите категорию</h3>
              </div>
            } key={index} />
          )}

          <Route path='/category/:page' element={<List />}>
            <Route path='post/:id' element={<Modal />} />
          </Route>

          <Route path='*' element={
            <div className={style.errorPage}>
              <h1>404</h1>
            </div>
          } />
        </Routes>
      </Layout>
    </main>
  );
};
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
