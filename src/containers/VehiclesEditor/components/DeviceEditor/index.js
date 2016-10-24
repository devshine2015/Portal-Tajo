import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import pure from 'recompose/pure';
import theme from 'configs/theme';
import DeviceSelector from 'containers/DeviceSelector';
import { deviceActions } from 'containers/VehiclesEditor/actions';

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
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.deviceId !== nextProps.deviceId) {
      this.updateImeiState(nextProps.deviceId);
    }
  }

  onAttach = () => {
    this.props.attachDevice(this.props.vehicleId, this.state.newImei)
    .then(() => {
      this.setState({
        newImei: null,
      });
    });
  }

  onDetach = () => {
    this.props.detachDevice(this.props.vehicleId);
  }

  onChange = (e, value) => {
    this.updateImeiState(value);
  }

  onNewDeviceSelect = imei => {
    this.setState({
      newImei: imei,
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
          onChange={this.onChange}
          floatingLabelText="Device IMEI"
          underlineStyle={underlineStyle}
          floatingLabelStyle={floatingLabelStyle}
        />
      );
    } else {
      inputField = (
        <DeviceSelector
          onChange={() => ({})}
          onSelect={this.onNewDeviceSelect}
          hasError={false}
          forcedValue={null}
          canRefresh={false}
        />
      );
    }

    return (
      <div className={styles.editor}>
        { inputField }

        { !hasDevice && (
          <EditorButton
            disabled={!this.state.newImei}
            tooltip="Attach device"
            icon={<AddIcon />}
            onClick={this.onAttach}
          />
        )}

        { hasDevice && (
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

  detachDevice: React.PropTypes.func.isRequired,
  attachDevice: React.PropTypes.func.isRequired,
};

const mapState = null;
const mapDispatch = {
  detachDevice: deviceActions.detachDevice,
  attachDevice: deviceActions.attachDevice,
};

const PureDeviceEditor = pure(DeviceEditor);

export default connect(mapState, mapDispatch)(PureDeviceEditor);
