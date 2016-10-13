import React from 'react';
import pure from 'recompose/pure';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';
import DevicesList from './components/DevicesList';
import Toolbox from './components/Toolbox';

import styles from './styles.css';

const PERMISSIONS = [
  permissions.DEVICES_SEE,
  permissions.DEVICES_CREATE,
];

function renderAddButton(userPermittedTo, onClick) {
  if (userPermittedTo[permissions.DEVICES_CREATE]) {
    return (
      <FloatingActionButton
        onClick={onClick}
        className={styles.floatingButton}
        primary
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  return null;
}

const DevicesManager = ({
  userPermittedTo,
}) => {
  if (!userPermittedTo[permissions.DEVICES_SEE]) {
    return null;
  }

  return (
    <div className={styles.managerContainer}>
      <Toolbox />
      <DevicesList />
      { renderAddButton(userPermittedTo) }
    </div>
  );
};

DevicesManager.propTypes = {
  userPermittedTo: React.PropTypes.object.isRequired,
};

export default pure(permitted(PERMISSIONS)(DevicesManager));
