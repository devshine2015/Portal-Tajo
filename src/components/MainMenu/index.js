import React from 'react';
import { Link } from 'react-router';
import pure from 'recompose/pure';

import styles from './styles.css';

const MainMenu = ({
  pages,
  closeSidebar,
}) => {
  const links = pages.map(page => (
    <li
      className={styles.menu__tem}
      key={page.path}
    >
      <Link
        to={page.path}
        onClick={closeSidebar}
      >
        {page.text}
      </Link>
    </li>
  ));

  return (
    <ul className={styles.menu}>
      {links}
    </ul>
  );
};

MainMenu.propTypes = {
  closeSidebar: React.PropTypes.func.isRequired,
  pages: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      path: React.PropTypes.string.isRequired,
      order: React.PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default pure(MainMenu);
