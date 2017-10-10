import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { getDevices } from 'services/Devices/reducer';
import {
  fetchDevices,
  updateWithVehicles,
} from 'services/Devices/actions';
import Device from '../Device';
import {
  getCurrentFilter,
  getSearchString,
} from '../../reducer';

import styles from './styles.css';

function searchById(id, searchString) {
  const r = new RegExp(searchString, 'g');

  return r.test(id);
}

const ListItem = props => (
  <li className={styles.list__item}>
    <Device {...props} />
  </li>
);

function renderDevices({
  currentFilter,
  devices,
  searchString,
}) {
  return devices.toList().map((d) => {
    if (currentFilter === 'not-attached' && !d.notAttached) return null;
    if (currentFilter === 'fault-vehicle' && !d.vehicleIsFault) return null;

    if (searchString && !searchById(d.id, searchString)) return null;

    return <ListItem key={d.id} {...d} />;
  });
}

renderDevices.propTypes = {
  devices: PropTypes.instanceOf(Map).isRequired,
  searchString: PropTypes.string,
  currentFilter: PropTypes.oneOf([
    'all', 'not-attached', 'fault-vehicle',
  ]).isRequired,
};

class DevicesList extends React.Component {
  componentWillMount() {
    if (this.props.devices.size === 0) {
      this.props.fetchDevices();
    } else {
      this.props.updateWithVehicles();
    }
  }

  render() {
    if (this.props.devices.size === 0) {
      return null;
    }

    return (
      <ul className={styles.list}>
        { renderDevices(this.props) }
      </ul>
    );
  }
}

DevicesList.propTypes = {
  // fetch list of all devices for fleet
  fetchDevices: PropTypes.func.isRequired,

  // update devices with properties depends on vehicles
  // like vehicle name, vehicleIsFault
  updateWithVehicles: PropTypes.func.isRequired,

  // sources for filtering
  devices: PropTypes.instanceOf(Map).isRequired,
  // notAttached: React.PropTypes.instanceOf(List).isRequired,
  // faultVehicles: React.PropTypes.instanceOf(List).isRequired,
};

DevicesList.defaultProps = {};

const mapState = state => ({
  devices: getDevices(state),
  currentFilter: getCurrentFilter(state),
  searchString: getSearchString(state),
});
const mapDispatch = {
  fetchDevices,
  updateWithVehicles,
};

const PureDevicesList = pure(DevicesList);

export default connect(mapState, mapDispatch)(PureDevicesList);
