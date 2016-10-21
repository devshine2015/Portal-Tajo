import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import {
  TextField,
  RaisedButton,
  FlatButton,
} from 'material-ui';
import DevicesSelector from '../DevicesSelector';
import { creatorActions } from 'containers/DevicesManager/actions';
import devices from 'configs/devices';

import styles from './styles.css';

class DeviceCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imei: '',
      modelId: null,
    };
  }

  onType = (e, value) => {
    const { name } = e.target;

    this.updateState(name, value);
  }

  onModelChange = (e, key, value) => {
    this.updateState('modelId', value);
  }

  onSubmit = e => {
    e.preventDefault();
    const deviceName = devices.getById(this.state.modelId).name;

    this.props.submitDevice({
      imei: this.state.imei,
      model: deviceName,
    });
  }

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  focus = ref => {
    if (!ref) return;

    ref.focus();
  }

  render() {
    return (
      <div className={styles.creatorContainer}>
        <h3 className={styles.header}>Register new device</h3>
        <form onSubmit={this.onSubmit}>
          <div className={styles.row}>
            <TextField
              required
              fullWidth
              floatingLabelFixed
              floatingLabelText="IMEI"
              name="imei"
              type="number"
              onChange={this.onType}
              value={this.state.imei}
              ref={this.focus}
            />
            <DevicesSelector
              required
              fullWidth
              floatingLabelFixed
              onChange={this.onModelChange}
              value={this.state.modelId}
            />
          </div>
          <div className={styles.buttons}>
            <RaisedButton
              primary
              onClick={this.onSubmit}
              type="submit"
              label="Submit"
            />
            <FlatButton
              type="reset"
              onClick={this.props.closeEditor}
              label="Cancel"
            />
          </div>
        </form>
      </div>
    );
  }
}

DeviceCreator.propTypes = {
  submitDevice: React.PropTypes.func.isRequired,
  closeEditor: React.PropTypes.func.isRequired,
};

const mapState = state => ({});
const mapDispatch = {
  submitDevice: creatorActions.submitDevice,
  closeEditor: creatorActions.closeEditor,
};

const PureDeviceCreator = pure(DeviceCreator);

export default connect(mapState, mapDispatch)(PureDeviceCreator);
