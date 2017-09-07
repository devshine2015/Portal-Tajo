import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { isAlerts } from 'configs';
import { rolesEnum } from 'configs/roles';
import pageShape from 'containers/InnerPortal/PropTypes';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import MenuItem from './components/ManuItem';
import styles from './styles.css';
import phrases from './PropTypes';

const EMPTY_ARRAY = [];

const MainMenu = ({
  pages,
  closeSidebar,
  role,
  translations,
}, {
  permissions,
}) => {
  const lowercasedRole = role.toLowerCase();
  const menuItems = pages.map((page) => {
    const includes = page.includeRoles || EMPTY_ARRAY;
    const excludes = page.excludeRoles || EMPTY_ARRAY;

    if (includes.length && includes.indexOf(lowercasedRole) === -1) return null;
    if (excludes.length && excludes.indexOf(lowercasedRole) !== -1) return null;
    if (page.name === 'users' && permissions.indexOf('view:users_manager') === -1) return null;
    if (page.name === 'alerts_editor' && !isAlerts) return null;

    return (
      <MenuItem
        key={page.path}
        page={page}
        niceName={translations[page.name]}
        closeSidebar={closeSidebar}
      />
    );
  });

  return (
    <ul className={styles.menu}>
      {menuItems}
    </ul>
  );
};

MainMenu.contextTypes = {
  permissions: PropTypes.array.isRequired,
};

MainMenu.displayName = 'MainMenu';

MainMenu.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(pageShape).isRequired,
  role: PropTypes.oneOf(rolesEnum),
  translations: makePhrasesShape(phrases).isRequired,
};

MainMenu.defaultProps = {
  role: 'admin',
};

export default pure(translate(phrases)(MainMenu));
