import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { isAlerts } from 'configs';
import pageShape from 'containers/InnerPortal/PropTypes';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import { authorizeWithPermissions } from 'utils/authz';
import MenuItem from './components/ManuItem';
import styles from './styles.css';
import phrases from './PropTypes';

const canShowUsersManager = () => authorizeWithPermissions('view:users_manager');
const canShowDevicesManager = () => authorizeWithPermissions('view:devices_manager');
const canShowInstallerManager = () => authorizeWithPermissions('edit:vehicle_device');

const verifyPermissions = (requiredPermissions) => {
  if (requiredPermissions === undefined) {
    return true;
  }
  return requiredPermissions.some(aPerm => authorizeWithPermissions(aPerm));
};

const MainMenu = ({
  pages,
  closeSidebar,
  translations,
}) => {
  const menuItems = pages.map((page) => {
    if (!verifyPermissions(page.requireOneOfPermissions)) return null;
    if (page.name === 'users' && !canShowUsersManager()) return null;
    if (page.name === 'alerts_editor' && !isAlerts) return null;
    if (page.name === 'devices_manager' && !canShowDevicesManager()) return null;
    if (page.name === 'installer' && !canShowInstallerManager()) return null;

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

MainMenu.displayName = 'MainMenu';

MainMenu.propTypes = {
  translations: makePhrasesShape(phrases).isRequired,
  closeSidebar: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(pageShape).isRequired,
};

export default pure(translate(phrases)(MainMenu));
