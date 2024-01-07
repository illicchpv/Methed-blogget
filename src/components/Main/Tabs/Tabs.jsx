/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Tabs.module.css';
import { assignId } from '../../utils/genRandomId';

import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as EyeIcon} from './img/eye.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as PostIcon} from './img/post.svg';
import {ReactComponent as SaveIcon} from './img/save.svg';

const LIST = [
  { value: 'Главная', Icon: EyeIcon },
  { value: 'Просмотренные', Icon: HomeIcon },
  { value: 'Сохранённые', Icon: PostIcon },
  { value: 'Мои посты', Icon: SaveIcon },
].map(assignId);

export const Tabs = (props) => {
  // const { list, setList } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.wrapperBtn}>
        <button className={style.btn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          add item
          <ArrowIcon width={15} height={15} />
        </button>
      </div>

      {isDropdownOpen && <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
        {LIST.map((el) => (
          <li className={style.item} key={el.id}>
            <button className={style.btn} onClick={() => {console.log(el.value);}}>
              {el.value}
              {el.Icon && <el.Icon width={30} height={30} />}
            </button>
          </li>
        ))}
      </ul>}
    </div>
  );
};

Tabs.propTypes = {
  props: PropTypes.object,
};
