import React from 'react';
import { Link } from 'react-router';
import pure from 'recompose/pure';

import styles from './styles.css';

const MainMenu = ({
  pages,
  baseUrl,
  closeSidebar,
}) => {
  const links = pages.map(page => (
    <li
      className={styles.menu__tem}
      key={page.path}
    >
      <Link
        to={`${baseUrl}/${page.path}`}
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
  baseUrl: React.PropTypes.string.isRequired,
  pages: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      path: React.PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default pure(MainMenu);
