import PropTypes from 'prop-types';
import style from './Heading.module.css';
import Text from '../../../UI/Text';

const Heading = (props) => (
  <Text As='h1' size={22} tsize={26} center
    className={style.heading}
  >
    {props.text}
  </Text>
);
Heading.propTypes = {
  text: PropTypes.string,
};
export default Heading;
