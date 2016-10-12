import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import pure from 'recompose/pure';

const STYLES = {
  disabledField: {
    color: 'rgba(0, 0, 0, 0.870588)',
  },
};

class DeviceEditor extends React.Component {
  render() {
    return (
      <TextField
        disabled
        autoWidth
        floatingLabelFixed
        underlineShow={false}
        name="deviceId"
        floatingLabelText="Device IMEI"
        inputStyle={STYLES.disabledField}
        value={this.props.deviceId}
      />
    );
  }
}

DeviceEditor.propTypes = {
  deviceId: React.PropTypes.string.isRequired,
};

const mapState = null;
const mapDispatch = null;

const PureDeviceEditor = pure(DeviceEditor);

export default connect(mapState, mapDispatch)(PureDeviceEditor);
