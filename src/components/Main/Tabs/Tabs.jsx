import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import style from './Tabs.module.css';
// import {assignId} from '../../../utils/genRandomId';

import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {debounceRaf} from '../../../utils/debounceRaf';
import Text from '../../../UI/Text';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {LIST} from '../../../api/const';
import {postsSlice} from '../../../store/posts/postsSlice';

export const Tabs = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true); // true - mobile version / desktop;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postsSelectedTab = useSelector(state => state.postsReducer.postsSelectedTab);

  console.log('postsSlice: ', postsSlice);

  const handleChangePage = (i) => {
    dispatch(postsSlice.actions.postsСhangeSelectedTab(i));
  };

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

  // debugger;

  return (
    <div className={style.container}>
      {isDropdown && <div className={style.wrapperBtn}>
        <Text As='button' size={18} tsize={24}
          className={style.btn} onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          {LIST[postsSelectedTab].value}

          <ArrowIcon width={15} height={15} />
        </Text>
      </div>}

      {(isDropdownOpen || !isDropdown) && <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
        {LIST.map((el) => (
          <li className={style.item} key={el.id}>
            <Text As='button' size={18} tsize={24}
              className={style.btn} onClick={() => {
                LIST.forEach((el2, i) => {
                  if (el2.value === el.value) {
                    handleChangePage(i)
                  }
                });
                navigate(`/category/${el.link}`);
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
