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
import { getById as getDeviceByid } from 'configs/devices';

import styles from './styles.css';

// match [numbers]
// or [numbers]-[numbers]
const imeiRegexp = /(^[0-9]+$)|(^[0-9]+\-{1}[0-9]+$)/;

class DeviceCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imei: '',
      modelId: '',
      errors: undefined,
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

    if (!this.validateImei()) {
      this.setError('imei', 'IMEI must contain only numbers and hyphen (ie. 0-898989)');
      return;
    }

    if (!this.state.modelId) {
      this.setError('model', 'You should choose device model');
      return;
    }

    const deviceName = getDeviceByid(this.state.modelId).name;

    this.setState({
      errors: undefined,
    }, () => {
      this.props.submitDevice({
        imei: this.state.imei,
        model: deviceName,
      });
    });
  }

  setError = (kind, text) => {
    this.setState({
      errors: {
        [kind]: text,
      },
    });
  }

  validateImei = () => imeiRegexp.test(this.state.imei)

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
    const { errors } = this.state;

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
              type="text"
              errorText={errors && errors.imei}
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
              errorText={errors && errors.model}
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

const mapState = null;
const mapDispatch = {
  submitDevice: creatorActions.submitDevice,
  closeEditor: creatorActions.closeEditor,
};

const PureDeviceCreator = pure(DeviceCreator);

export default connect(mapState, mapDispatch)(PureDeviceCreator);
