import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import pure from 'recompose/pure';
import { permissions } from 'configs/roles';
import DeviceSelector from 'containers/DeviceSelector';
import permitted from 'utils/permissionsRequired';

import styles from './styles.css';

const PERMISSIONS = [
  permissions.DEVICES_DETACH,
  permissions.DEVICES_ATTACH,
];

const EditorButton = ({
  onClick,
  icon,
  tooltip,
  disabled = false,
}) => (
  <IconButton
    disabled={disabled}
    tooltip={tooltip}
    onClick={onClick}
  >
    {icon}
  </IconButton>
);

EditorButton.propTypes = {
  // false by default
  disabled: PropTypes.bool,

  // callback fired on button click
  onClick: PropTypes.func.isRequired,

  // svg-material-ui icon
  icon: PropTypes.node.isRequired,

  // text to display on button hover
  tooltip: PropTypes.string.isRequired,
};

class DeviceEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imei: props.deviceId,
      haveToReset: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.deviceId !== nextProps.deviceId) {
      this.updateImeiState(nextProps.deviceId);
    }
  }

  onDetach = () => {
    this.setState({
      haveToReset: true,
    }, () => {
      this.props.updateDeviceId('');
    });
  }

  onNewDeviceSelect = imei => {
    this.setState({
      haveToReset: false,
    }, () => {
      this.props.updateDeviceId(imei);
    });
  }

  updateImeiState = (value = '') => {
    this.setState({
      imei: value,
      haveToReset: true,
    });
  }

  render() {
    const hasDevice = !!this.props.deviceId;
    const canAttach = this.props.userPermittedTo[permissions.DEVICES_ATTACH];
    const canDetach = this.props.userPermittedTo[permissions.DEVICES_DETACH];

    const inputField = (
      <DeviceSelector
        disabled={!canAttach}
        canRefresh={false}
        value={this.props.deviceId}
        reset={this.state.haveToReset}
        onSelect={this.onNewDeviceSelect}
      />
    );

    return (
      <div className={styles.editor}>
        { inputField }

        { hasDevice && canDetach && (
          <EditorButton
            tooltip="Detach device"
            icon={<RemoveIcon />}
            onClick={this.onDetach}
          />
        )}

      </div>
    );
  }
}

DeviceEditor.propTypes = {
  // display deviceId if it presented
  // could be empty
  deviceId: PropTypes.string,

  // id of vehicle
  // vehicleId: React.PropTypes.string.isRequired,

  userPermittedTo: PropTypes.object,

  // callback on attach/detach device
  // returns new deviceId
  updateDeviceId: PropTypes.func.isRequired,
};

const PureDeviceEditor = pure(permitted(PERMISSIONS)(DeviceEditor));

export default PureDeviceEditor;
