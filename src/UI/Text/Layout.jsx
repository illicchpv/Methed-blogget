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
Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
export default Layout;
