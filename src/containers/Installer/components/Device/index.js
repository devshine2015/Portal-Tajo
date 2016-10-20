import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import AutoComplete from 'material-ui/AutoComplete';
import { fetchDevices } from 'services/Devices/actions';
import {
  hasDevices,
  getVacantDevices,
} from 'services/Devices/reducer';

import styles from './styles.css';

const ERROR_MESSAGE = 'You must choose one of existing devices';

class Device extends React.Component {

  componentWillMount() {
    if (!this.props.hasDevices) {
      this.props.fetchDevices();
    }
  }

  onUpdateInput = searchString => {
    this.props.onChange('imei', searchString);
  }

  render() {
    const error = this.props.hasError ? ERROR_MESSAGE : '';

    return (
      <div className={styles.device}>
        <AutoComplete
          required
          fullWidth
          name="imei"
          floatingLabelText="IMEI"
          dataSource={this.props.vacantDevices}
          filter={AutoComplete.fuzzyFilter}
          onNewRequest={this.props.onSelect}
          onUpdateInput={this.onUpdateInput}
          errorText={error}
          maxSearchResults={7}
        />
      </div>
    );
  }
}

Device.propTypes = {
  fetchDevices: React.PropTypes.func.isRequired,

  // true if no device has been chosen
  hasError: React.PropTypes.bool.isRequired,

  // Callback function that is fired when a list item is selected,
  // or enter is pressed in the TextField.
  onSelect: React.PropTypes.func.isRequired,

  // Callback function that is fired when
  // the user updates the TextField.
  onChange: React.PropTypes.func.isRequired,

  // true if list not empty
  hasDevices: React.PropTypes.bool.isRequired,

  // array of imies
  vacantDevices: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired,
};

const mapState = state => ({
  hasDevices: hasDevices(state),
  vacantDevices: getVacantDevices(state),
});
const mapDispatch = {
  fetchDevices,
};

const PureDevice = pure(Device);

export default connect(mapState, mapDispatch)(PureDevice);
