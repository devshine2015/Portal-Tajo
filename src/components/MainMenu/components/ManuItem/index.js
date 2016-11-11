import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

// <li
//   className={styles.menu__item}
//   key={props.page.path}
// >

const MenuItem = (props) =>
  <Link
    className={styles.menu__item}
    key={props.page.path}
    to={props.page.path}
    onClick={props.closeSidebar}
  >
   {props.page.text}
  </Link>;

MenuItem.propTypes = {
  closeSidebar: React.PropTypes.func.isRequired,
  page: React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    path: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
