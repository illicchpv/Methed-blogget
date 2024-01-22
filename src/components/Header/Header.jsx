// import React from 'react'
import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Search from './Search';
import Auth from './Auth';
import Heading from './Heading';
import {useSelector} from 'react-redux';
import {LIST} from '../../api/const';

export const Header = () => {
  const postsSelectedTab = useSelector(state => state.postsReducer.postsSelectedTab);

  return (
    <header className={style.header}>
      <Layout>
        <div className={style.gridContainer}>
          <Logo />
          <Heading text={LIST[postsSelectedTab].value} />
          <Search />
          <Auth /> {/* v3  */}
          {/* v2 <Auth token={ctx.token} delToken={ctx.delToken} /> */}
          {/* v1 <Consumer>{(ctx) => <Auth token={ctx.token} delToken={ctx.delToken} />}</Consumer> */}
          {/* // ! можно так <Consumer>{(ctx) => <Auth {...ctx} />}</Consumer> */}
        </div>
      </Layout>
    </header>
  );
};

