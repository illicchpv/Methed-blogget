import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './Tabs.module.css';
import { assignId } from '../../utils/genRandomId';

import { ReactComponent as ArrowIcon } from './img/arrow.svg';
// import { ReactComponent as EyeIcon } from './img/eye.svg';
// import { ReactComponent as HomeIcon } from './img/home.svg';
// import { ReactComponent as PostIcon } from './img/post.svg';
// import { ReactComponent as SaveIcon } from './img/save.svg';
import { ReactComponent as HomeIcon } from './img2/home.svg';
import { ReactComponent as TopIcon } from './img2/top.svg';
import { ReactComponent as BestIcon } from './img2/best.svg';
import { ReactComponent as HotIcon } from './img2/hot.svg';
import { debounceRaf } from '../../utils/debounceRaf';
import Text from '../../../UI/Text';

const LIST = [
  // { value: 'Главная', Icon: EyeIcon },
  // { value: 'Просмотренные', Icon: HomeIcon },
  // { value: 'Сохранённые', Icon: PostIcon },
  // { value: 'Мои посты', Icon: SaveIcon },
  { value: 'Главная', Icon: HomeIcon },
  { value: 'Топ', Icon: TopIcon },
  { value: 'Лучшие', Icon: BestIcon },
  { value: 'Горячие', Icon: HotIcon },
].map(assignId);

export const Tabs = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true); // true - mobile version / desktop;
  const [selectedTab, setSelectedTab] = useState(0);

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  console.log('selectedTab: ', selectedTab);
  return (
    <div className={style.container}>
      {isDropdown && <div className={style.wrapperBtn}>
        <Text As='button' size={18} tsize={24}
          className={style.btn} onClick={() => {
            setIsDropdownOpen(!isDropdownOpen)
          }}
        >
          LIST[selectedTab].value
          
          <ArrowIcon width={15} height={15} />
        </Text>
      </div>}

      {(isDropdownOpen || !isDropdown) && <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
        {LIST.map((el) => (
          <li className={style.item} key={el.id}>
            <Text As='button' size={18} tsize={24}
              className={style.btn} onClick={() => {
                LIST.forEach((el2, i) => {
                  if (el2.value === el.value) setSelectedTab(i)
                });
              }}>
              {el.value}
              {el.Icon && <el.Icon width={30} height={30} />}
            </Text>
          </li>
        ))}
      </ul>}
    </div>
  );
};

Tabs.propTypes = {
  props: PropTypes.object,
};
