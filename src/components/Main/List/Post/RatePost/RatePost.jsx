import style from './RatePost.module.css';
import PropTypes from 'prop-types';
import Text from '../../../../../UI/Text';


export const RatePost = (props) => {
  const {ups} = props;
  return (
    <div className={style.rating}>
      <button className={style.up} aria-label="повысить рейтинг"></button>
      {ups <= 10 &&
        <Text As='p' size={16} tsize={24} medium italic
          className={style.ups}>{ups}
        </Text>
      }
      {ups > 10 &&
        <Text As='p' size={16} tsize={24} bold color='green'
          className={style.ups}>{ups}
        </Text>
      }
      <button className={style.down} aria-label="понизить рейтинг"></button>
    </div>
  );
};

RatePost.propTypes = {
  props: PropTypes.object,
  ups: PropTypes.number,
};
