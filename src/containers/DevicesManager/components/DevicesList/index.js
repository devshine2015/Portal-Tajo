import React from 'react';
import pure from 'recompose/pure';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import Device from '../Device';
import { fetchActions } from '../../actions';
import {
  getNotAttached,
  getFaultVehicles,
  getCurrentFilter,
} from '../../reducer';
import { getDevices } from 'services/Devices/reducer';
import { hasProcessedVehicles } from 'services/FleetModel/reducer';

import styles from './styles.css';

const ListItem = (props) => (
  <li className={styles.list__item}>
    <Device {...props} />
  </li>
);

function mapSource(source, devices) {
  return source.map(id => {
    const d = devices.get(id);

    return <ListItem key={id} {...d} />;
  });
}

function renderDevices({
  currentFilter,
  devices,
  faultVehicles,
  notAttached,
}) {
  switch (currentFilter) {
    case 'fault-vehicle':
      return mapSource(faultVehicles, devices);

    case 'not-attached':
      return mapSource(notAttached, devices);

    case 'all':
    default:
      return devices.toList().map(d => <ListItem key={d.id} {...d} />);
  }
}

renderDevices.propTypes = {
  devices: React.PropTypes.instanceOf(Map).isRequired,
  notAttached: React.PropTypes.instanceOf(List).isRequired,
  faultVehicles: React.PropTypes.instanceOf(List).isRequired,
  currentFilter: React.PropTypes.oneOf([
    'all', 'not-attached', 'fault-vehicle',
  ]).isRequired,
};

class DevicesList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      setupFinished: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // be sure vehicles loaded and setup is finished
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

    return (
      <ul className={styles.list}>
        { renderDevices(this.props) }
      </ul>
    );
  }
}

DevicesList.propTypes = {
  // fetch list of all devices for fleet
  fetchDevices: React.PropTypes.func.isRequired,

  // true if size of processedList > 0
  hasVehicles: React.PropTypes.bool.isRequired,

  // sources for filtering
  devices: React.PropTypes.instanceOf(Map).isRequired,
  notAttached: React.PropTypes.instanceOf(List).isRequired,
  faultVehicles: React.PropTypes.instanceOf(List).isRequired,

  // choose source to display by currentFilter
  currentFilter: React.PropTypes.oneOf([
    'all', 'not-attached', 'fault-vehicle',
  ]).isRequired,
};

const mapState = state => ({
  devices: getDevices(state),
  hasVehicles: hasProcessedVehicles(state),
  notAttached: getNotAttached(state),
  faultVehicles: getFaultVehicles(state),
  currentFilter: getCurrentFilter(state),
});
const mapDispatch = {
  fetchDevices: fetchActions.fetchDevices,
};

const PureDevicesList = pure(DevicesList);

export default connect(mapState, mapDispatch)(PureDevicesList);
