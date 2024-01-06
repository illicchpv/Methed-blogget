import React from 'react';
import PropTypes from 'prop-types';
import style from './Layout.module.css';

// export const Layout = React.memo( (props) => {
const Layout = (props) => (
  <div className={style.container}>{props.children}</div>
);
Layout.propTypes = {
  children: PropTypes.object,
};
export default Layout;
