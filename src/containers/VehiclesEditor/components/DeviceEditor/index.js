import React from 'react';
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
  disabled: React.PropTypes.bool,

  // callback fired on button click
  onClick: React.PropTypes.func.isRequired,

  // svg-material-ui icon
  icon: React.PropTypes.node.isRequired,

  // text to display on button hover
  tooltip: React.PropTypes.string.isRequired,
};

class DeviceEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imei: props.deviceId || '',
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
    });
  }

  render() {
    const hasDevice = !!this.props.deviceId;
    const canAttach = this.props.userPermittedTo[permissions.DEVICES_ATTACH];
    const canDetach = this.props.userPermittedTo[permissions.DEVICES_DETACH];

    let forcedValue = null;

    if (this.state.haveToReset && !hasDevice) {
      forcedValue = '';
    } else if (hasDevice) {
      forcedValue = this.props.deviceId;
    }

    const inputField = (
      <DeviceSelector
        disabled={!canAttach}
        hasError={false}
        canRefresh={false}
        forcedValue={forcedValue}
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
  deviceId: React.PropTypes.string,

  // id of vehicle
  vehicleId: React.PropTypes.string.isRequired,

  userPermittedTo: React.PropTypes.object,

  // callback on attach/detach device
  // returns new deviceId
  updateDeviceId: React.PropTypes.func.isRequired,
};

const PureDeviceEditor = pure(permitted(PERMISSIONS)(DeviceEditor));

export default PureDeviceEditor;
