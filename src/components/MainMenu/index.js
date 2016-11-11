import React from 'react';
import pure from 'recompose/pure';
import MenuItem from './components/ManuItem';
import styles from './styles.css';

const MainMenu = ({
  pages,
  closeSidebar,
}) => {
  const menuItems = pages.map(page => (
    <MenuItem
      key={page.path}
      page={page}
      closeSidebar={closeSidebar}
    />
  ));

  return (
    <ul className={styles.menu}>
      {menuItems}
    </ul>
  );
};

MainMenu.propTypes = {
  closeSidebar: React.PropTypes.func.isRequired,
  pages: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      path: React.PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default pure(MainMenu);
