import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { authorizeWithPermissions } from 'utils/authz';
import { creatorActions } from 'containers/DevicesManager/actions';
import { getIsEditing } from 'containers/DevicesManager/reducer';
import Layout from 'components/Layout';
import DevicesList from './components/DevicesList';
import Toolbox from './components/Toolbox';
import DeviceCreator from './components/DeviceCreator';

import styles from './styles.css';

const canCreateDevice = () => authorizeWithPermissions('add:device');

function renderAddButton(onClick) {
  if (canCreateDevice()) {
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
  isEditing,
  openEditor,
}) => {
  return (
    <Layout.Content>
      <div className={styles.managerContainer}>
        <Toolbox />

        { isEditing && <DeviceCreator /> }

        <DevicesList />

        { !isEditing && renderAddButton(openEditor) }
      </div>
    </Layout.Content>
  );
};

DevicesManager.propTypes = {
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

const PureDevicesManager = pure(DevicesManager);

export default connect(mapState, mapDispatch)(PureDevicesManager);
