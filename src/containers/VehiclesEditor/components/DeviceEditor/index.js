import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import pure from 'recompose/pure';
import theme from 'configs/theme';
import { permissions } from 'configs/roles';
import DeviceSelector from 'containers/DeviceSelector';
import permitted from 'utils/permissionsRequired';

import styles from './styles.css';

const STYLES = {
  disabledField: {
    color: 'rgba(0, 0, 0, 0.870588)',
  },
  warningUnderline: {
    borderColor: theme.palette.accent1Color,
  },
  warning: {
    color: theme.palette.accent1Color,
  },
};

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
      newImei: null,
      haveToReset: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.deviceId !== nextProps.deviceId) {
      this.updateImeiState(nextProps.deviceId);
    }
  }

  onAttach = () => {
    this.setState({
      haveToReset: false,
    }, () => {
      this.props.updateDeviceId(this.state.newImei);
    });
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
      newImei: imei,
      haveToReset: false,
    });
  }

  updateImeiState = (value = '') => {
    this.setState({
      imei: value,
    });
  }

  render() {
    const hasDevice = !!this.props.deviceId;
    const fieldStyles = hasDevice ? STYLES.disabledField : {};
    const hintText = hasDevice ? '' : 'Fill in IMEI';
    const errorText = !hasDevice ? 'No device attached' : '';
    const floatingLabelStyle = !hasDevice ? STYLES.warning : {};
    const errorStyle = !hasDevice ? STYLES.warning : {};
    const underlineStyle = !hasDevice ? STYLES.warningUnderline : {};
    const canAttach = this.props.userPermittedTo[permissions.DEVICES_ATTACH];
    const canDetach = this.props.userPermittedTo[permissions.DEVICES_DETACH];

    let inputField;

    if (hasDevice) {
      inputField = (
        <TextField
          fullWidth
          name="deviceId"
          floatingLabelFixed
          hintText={hintText}
          disabled={hasDevice}
          errorText={errorText}
          value={this.state.imei}
          errorStyle={errorStyle}
          inputStyle={fieldStyles}
          underlineShow={!hasDevice}
          floatingLabelText="Device IMEI"
          underlineStyle={underlineStyle}
          floatingLabelStyle={floatingLabelStyle}
        />
      );
    } else {
      inputField = (
        <DeviceSelector
          disabled={!canAttach}
          hasError={false}
          canRefresh={false}
          forcedValue={this.state.haveToReset ? '' : null}
          onSelect={this.onNewDeviceSelect}
        />
      );
    }

    return (
      <div className={styles.editor}>
        { inputField }

        { !hasDevice && canAttach && (
          <EditorButton
            disabled={!this.state.newImei}
            tooltip="Attach device"
            icon={<AddIcon />}
            onClick={this.onAttach}
          />
        )}

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
