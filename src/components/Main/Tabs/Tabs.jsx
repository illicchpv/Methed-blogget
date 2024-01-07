/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Tabs.module.css';

export const Tabs = (props) => {
  // console.log('Tabs props:', props);
  const { list, setList } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = id => {
    setList(list.filter((el) => el.id !== id));
  };

  return (
    <>
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>add item</button>

      {isDropdownOpen && <ul className={style.list}>
        {list.map((el) => (
          <li key={el.id}>
            <button onClick={() => handleClick(el.id)}>{el.value}</button>
          </li>
        ))}
      </ul>}
    </>
    // { isDropdownOpen && <ul className={style.list}>
    //   {
    //     list.map(
    //       (el) => <li key={el.id}>
    //         <button
    //           onClick={
    //             () => {
    //               handleClick(el.id);
    //             }
    //           }>{el.value}</button>
    //       </li>
    //     )
    //   }
    // </ul>
    // }
  );
};

Tabs.propTypes = {
  props: PropTypes.object,
};
