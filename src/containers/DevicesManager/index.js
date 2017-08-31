import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';
import Layout from 'components/Layout';
import DevicesList from './components/DevicesList';
import Toolbox from './components/Toolbox';
import DeviceCreator from './components/DeviceCreator';
import { getIsEditing } from 'containers/DevicesManager/reducer';
import { creatorActions } from 'containers/DevicesManager/actions';

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
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  return null;
}

const DevicesManager = ({
  userPermittedTo,
  isEditing,
  openEditor,
}) => {
  if (!userPermittedTo[permissions.DEVICES_SEE]) {
    return null;
  }

  return (
    <Layout.Content>
      <div className={styles.managerContainer}>
        <Toolbox />

        { isEditing && <DeviceCreator /> }

        <DevicesList />

        { !isEditing && renderAddButton(userPermittedTo, openEditor) }
      </div>
    </Layout.Content>
  );
};

DevicesManager.propTypes = {
  userPermittedTo: PropTypes.object.isRequired,

  // callback on add button click
  openEditor: PropTypes.func.isRequired,

  // if true display creator
  isEditing: PropTypes.bool.isRequired,
};

const mapState = state => ({
  isEditing: getIsEditing(state),
});
const mapDispatch = {
  openEditor: creatorActions.openEditor,
};

const PureDevicesManager = pure(permitted(PERMISSIONS)(DevicesManager));
export default connect(mapState, mapDispatch)(PureDevicesManager);
