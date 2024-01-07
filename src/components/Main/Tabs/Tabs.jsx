/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Tabs.module.css';
import { assignId } from '../../utils/genRandomId';

const LIST = [
  { value: 'Главная' },
  { value: 'Просмотренные' },
  { value: 'Сохранённые' },
  { value: 'Мои посты' },
].map(assignId);

export const Tabs = (props) => {
  // const { list, setList } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.wrapperBtn}>
        <button className={style.btn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>add item</button>
      </div>

      {isDropdownOpen && <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
        {LIST.map((el) => (
          <li className={style.item} key={el.id}>
            <button className={style.btn} onClick={() => {console.log(el.value);}}>{el.value}</button>
          </li>
        ))}
      </ul>}
    </div>
  );
};

Tabs.propTypes = {
  props: PropTypes.object,
};
