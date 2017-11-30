import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import pageShape from 'containers/InnerPortal/PropTypes';
import { theme } from 'configs';
import styles from './styles.css';

const MenuItem = (props) => {
  const myStyle = props.isSelected ? theme.mainMenuItemSelected : theme.mainMenuItem;

  return (<Link
    key={props.page.path}
    to={props.page.path}
    onClick={props.closeSidebar}
  >
    <div
      className={styles.menu__item}
      style={myStyle}
    >
      <span className={styles.item__icon}>
        {props.page.icon}
      </span>
      <span className={styles.item__text}>
        { props.niceName || props.page.name }
      </span>
    </div>
  </Link>);

  // return (<Link
  //   className={styles.menu__item}
  //   style={theme.mainMenuItem}
  //   key={props.page.path}
  //   to={props.page.path}
  //   onClick={props.closeSidebar}
  // >
  //   <span className={styles.item__text}>
  //     { props.niceName || props.page.name }
  //   </span>
  // </Link>);
};

MenuItem.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  page: pageShape.isRequired,
  niceName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default MenuItem;
