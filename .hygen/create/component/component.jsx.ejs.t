---
to: <%= absPath %>/<%= component_name %>.jsx
---
// import React from 'react';
// import { URL_API } from '../../../api/const'
// import { urlAuth } from '../../../api/auth';
// import Text from '../../../UI/Text';
// import { ReactComponent as LoginIcon } from './img/login.svg';
import PropTypes from 'prop-types';
import style from './<%= component_name %>.module.css';

export const <%= component_name %> = (props) => {
  console.log('<%= component_name %> props:', props);

  return (
    <div className={style.container}><%= component_name %></div>
  );
};

<%= component_name %>.propTypes = {
  props: PropTypes.object,
};
