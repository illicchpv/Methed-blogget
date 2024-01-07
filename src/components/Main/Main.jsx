/* eslint-disable no-undef */
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
