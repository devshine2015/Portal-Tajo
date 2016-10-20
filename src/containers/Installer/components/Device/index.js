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


class Device extends React.Component {

  componentWillMount() {
    if (!this.props.hasDevices) {
      this.props.fetchDevices();
    }
  }

  render() {
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
          maxSearchResults={7}
        />
      </div>
    );
  }
}

Device.propTypes = {
  fetchDevices: React.PropTypes.func.isRequired,

  // Callback function that is fired when a list item is selected,
  // or enter is pressed in the TextField.
  onSelect: React.PropTypes.func.isRequired,

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
