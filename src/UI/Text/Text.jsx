/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Text.module.css';

const Text = (props) => {
  const {
    As = 'span',
    color = 'black',
    size,
    tsize,
    dsize,
    className,
    children,
    href,
    center,
  } = props;

  const classes = classNames(
    className,
    style[color],
    { [style[`fs${size}`]]: size },
    { [style[`fst${tsize}`]]: tsize },
    { [style[`dst${dsize}`]]: dsize },
    { [style.center]: center },
  );

  return <As className={classes} href={href}>{children}</As>;
};
Text.propTypes = {
  children: PropTypes.object,
};
Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  As: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  tsize: PropTypes.number,
  dsize: PropTypes.number,
  className: PropTypes.string,
  href: PropTypes.string,
  center: PropTypes.bool,
};
export default Text;
