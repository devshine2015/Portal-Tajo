import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import {
  TextField,
  SelectField,
  MenuItem,
  RaisedButton,
  FlatButton,
} from 'material-ui';
import { creatorActions } from 'containers/DevicesManager/actions';

import styles from './styles.css';

const KINDS = [{
  id: 1,
  manufacturer: 'Atrack',
  model: 'as7',
}, {
  id: 2,
  manufacturer: 'Atrack',
  model: 'al5',
}];

const kinds = KINDS.map(kind => (
  <MenuItem
    key={kind.id}
    value={kind.id}
    primaryText={`${kind.manufacturer} ${kind.model}`}
  />
));

class DeviceCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imei: '',
      model: null,
    };
  }

  onType = (e, value) => {
    const { name } = e.target;

    this.updateState(name, value);
  }

  onModelChange = (e, key, value) => {
    this.updateState('model', value);
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.submitDevice(this.state);
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
        <form
          onSubmit={this.onSubmit}
        >
          <TextField
            required
            fullWidth
            floatingLabelText="IMEI"
            name="imei"
            type="number"
            onChange={this.onType}
            value={this.state.imei}
            ref={this.focus}
          />
          <SelectField
            required
            fullWidth
            floatingLabelFixed
            floatingLabelText="Choose Model"
            name="model"
            value={this.state.model}
            onChange={this.onModelChange}
          >
            {kinds}
          </SelectField>

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
