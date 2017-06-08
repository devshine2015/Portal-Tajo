import React from 'react';
import pure from 'recompose/pure';
import { rolesEnum } from 'configs/roles';
import MenuItem from './components/ManuItem';
import pageShape from 'containers/InnerPortal/PropTypes';
import { translate } from 'utils/i18n';
import { isAlerts } from 'configs';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

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
  permissions: React.PropTypes.array.isRequired,
};

MainMenu.propTypes = {
  closeSidebar: React.PropTypes.func.isRequired,
  pages: React.PropTypes.arrayOf(pageShape).isRequired,
  role: React.PropTypes.oneOf(rolesEnum),

  translations: phrasesShape.isRequired,
};

MainMenu.defaultProps = {
  translations: phrases,
  role: 'admin',
};

const Pure = pure(MainMenu);

export default translate(phrases)(Pure);
