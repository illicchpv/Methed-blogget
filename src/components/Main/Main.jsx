/* eslint-disable block-spacing */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import { assignId, genRandomId, genRandomId36 } from '../utils/genRandomId';

const LIST = [
  { value: 'Главная' },
  { value: 'Просмотренные' },
  { value: 'Сохранённые' },
  { value: 'Мои посты' },
].map(assignId);
// ].map(el => assignId(el));
// ].map(el => ({...el, id: genRandomId()}));

const Main = (props) => {
  const [list, setList] = useState(LIST);

  const addItem = () => {
    setList([...list, assignId({ value: 'Новый пост', id: '222' })]);
    // setList(list.concat(assignId({ value: 'Новый пост', id: '222' })));

    // setList((prev) => { // ! так не работает
    //   prev.push({ value: 'Новый пост', id: '222' });
    // }); // { value: 'Новый пост' }
  };

  return (
    <main className={style.main}>
      <Layout>
        {/* <button onClick={addItem}>addItem</button> */}
        {/* {props.children} */}
        <Tabs list={list} setList={setList} />
        <List />
      </Layout>
    </main>
  );
};
// Main.propTypes = {
//   children: PropTypes.object,
// };
export default Main;
