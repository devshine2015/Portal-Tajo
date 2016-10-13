import React from 'react';
import pure from 'recompose/pure';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Device from '../Device';
import { fetchDevices } from 'services/Devices/actions';
import { getDevices } from 'services/Devices/reducer';

import styles from './styles.css';

class DevicesList extends React.Component {

  componentWillMount() {
    this.props.fetchDevices();
  }

  render() {
    if (this.props.devices.size === 0) {
      return null;
    }

    const devices = this.props.devices.map(d => (
      <li
        key={d.id}
        className={styles.list__item}
      >
        <Device {...d} />
      </li>
    ));

    return (
      <ul className={styles.list}>
        {devices}
      </ul>
    );
  }
}

DevicesList.propTypes = {
  // fetch list of all devices for fleet
  fetchDevices: React.PropTypes.func.isRequired,

  // list of devices
  devices: React.PropTypes.instanceOf(Map).isRequired,
};

const mapState = state => ({
  devices: getDevices(state),
});
const mapDispatch = {
  fetchDevices,
};

const PureDevicesList = pure(DevicesList);

export default connect(mapState, mapDispatch)(PureDevicesList);
