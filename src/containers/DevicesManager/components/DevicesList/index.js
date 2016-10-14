import React from 'react';
import pure from 'recompose/pure';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Device from '../Device';
import { fetchActions } from '../../actions';
import { getDevices } from 'services/Devices/reducer';
import { hasProcessedVehicles } from 'services/FleetModel/reducer';

import styles from './styles.css';

class DevicesList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      setupFinished: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // be sure vehicles loaded
    if (!this.props.hasVehicles && nextProps.hasVehicles) {
      this.props.fetchDevices()
        .then(() => {
          this.setState({
            setupFinished: true,
          });
        });
    }
  }

  render() {
    if (this.props.devices.size === 0 || !this.state.setupFinished) {
      return null;
    }

    const devices = this.props.devices.toList().map(d => (
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

  // true if size of processedList > 0
  hasVehicles: React.PropTypes.bool.isRequired,
};

const mapState = state => ({
  devices: getDevices(state),
  hasVehicles: hasProcessedVehicles(state),
});
const mapDispatch = {
  fetchDevices: fetchActions.fetchDevices,
};

const PureDevicesList = pure(DevicesList);

export default connect(mapState, mapDispatch)(PureDevicesList);
