import React from 'react';
import PropTypes from 'prop-types';
import style from './Main.module.css';
import Layout from '../Layout';

const Main = (props) => (
  <main className={style.main}>
    <Layout>
      {props.children}
    </Layout>
  </main>
);
Main.propTypes = {
  children: PropTypes.object,
};
export default Main;
