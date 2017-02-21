import React from 'react';
import { Link } from 'react-router';
import pageShape from 'containers/InnerPortal/PropTypes';
import styles from './styles.css';

const MenuItem = (props) =>
  <Link
    className={styles.menu__item}
    key={props.page.path}
    to={props.page.path}
    onClick={props.closeSidebar}
  >
   { props.niceName }
  </Link>;

MenuItem.propTypes = {
  closeSidebar: React.PropTypes.func.isRequired,
  page: pageShape.isRequired,
  niceName: React.PropTypes.string.isRequired,
};

export default MenuItem;
