import PropTypes from 'prop-types';
import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Heading from './Heading';
import Search from './Search';
import Auth from './Auth';

export const Header = ({token, clearToken}) => (
  <header className={style.header}>
    <Layout>
      <div className={style.gridContainer}>
        <Logo />
        <Heading text='Главная' />
        <Search />
        <Auth token={token} clearToken={clearToken} />
      </div>
    </Layout>
  </header>
);
Header.propTypes = {
  token: PropTypes.string,
};
export default Header;
