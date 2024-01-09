import React from 'react'
import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Search from './Search';
import Auth from './Auth';
import Heading from './Heading';
import { tokenContext } from '../../context/tokenContext';

export const Header = () => {
  const {Consumer} = tokenContext;

  return (
    <header className={style.header}>
      <Layout>
        <div className={style.gridContainer}>
          <Logo />
          <Heading text='Главная' />
          <Search />
          <Consumer>
            {(ctx) => <Auth token={ctx.token} delToken={ctx.delToken} />}
          </Consumer>
        </div>
      </Layout>
    </header>
  )
};

