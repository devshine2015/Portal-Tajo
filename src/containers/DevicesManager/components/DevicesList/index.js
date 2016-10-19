import React from 'react';
import pure from 'recompose/pure';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import Device from '../Device';
import {
  // getNotAttached,
  // getFaultVehicles,
  getCurrentFilter,
  getSearchString,
} from '../../reducer';
import { getDevices } from 'services/Devices/reducer';
import { hasProcessedVehicles } from 'services/FleetModel/reducer';
import {
  fetchDevices,
  updateWithVehicles,
} from 'services/Devices/actions';

import styles from './styles.css';

function searchById(id, searchString) {
  return !!searchString ? id.search(searchString) !== -1 : true;
}

const ListItem = (props) => (
  <li className={styles.list__item}>
    <Device {...props} />
  </li>
);

function mapSource(source, searchString, devices) {
  return source.map(id => {
    const d = devices.get(id);

    if (!searchById(id, searchString)) return null;

    return <ListItem key={d.id} {...d} />;
  });
}

function renderDevices({
  currentFilter,
  devices,
  faultVehicles,
  notAttached,
  searchString,
}) {
  switch (currentFilter) {
    case 'fault-vehicle':
      return mapSource(faultVehicles, searchString, devices);

    case 'not-attached':
      return mapSource(notAttached, searchString, devices);

    case 'all':
    default: {
      return devices.toList().map(d => {
        if (!searchById(d.id, searchString)) return null;

        return <ListItem key={d.id} {...d} />;
      });
    }
  }
}

renderDevices.propTypes = {
  devices: React.PropTypes.instanceOf(Map).isRequired,
  notAttached: React.PropTypes.instanceOf(List).isRequired,
  faultVehicles: React.PropTypes.instanceOf(List).isRequired,
  searchString: React.PropTypes.string,
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

  componentWillMount() {
    if (this.props.devices.size === 0) {
      this.props.fetchDevices();
    }
  }

  componentWillReceiveProps(nextProps) {
    // be sure vehicles loaded and setup is finished
    if (!this.state.setupFinished &&
        this.props.devices.size > 0 &&
        (this.props.hasVehicles ||
        (!this.props.hasVehicles && nextProps.hasVehicles))) {
      this.setState({
        setupFinished: true,
      }, () => {
        this.props.updateWithVehicles();
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

  // update devices with properties depends on vehicles
  // like vehicle name, vehicleIsFault
  updateWithVehicles: React.PropTypes.func.isRequired,

  // true if size of processedList > 0
  hasVehicles: React.PropTypes.bool.isRequired,

  // sources for filtering
  devices: React.PropTypes.instanceOf(Map).isRequired,
  // notAttached: React.PropTypes.instanceOf(List).isRequired,
  // faultVehicles: React.PropTypes.instanceOf(List).isRequired,

  searchString: React.PropTypes.string,

  // choose source to display by currentFilter
  currentFilter: React.PropTypes.oneOf([
    'all', 'not-attached', 'fault-vehicle',
  ]).isRequired,
};

const mapState = state => ({
  devices: getDevices(state),
  hasVehicles: hasProcessedVehicles(state),
  // notAttached: getNotAttached(state),
  // faultVehicles: getFaultVehicles(state),
  currentFilter: getCurrentFilter(state),
  searchString: getSearchString(state),
});
const mapDispatch = {
  fetchDevices,
  updateWithVehicles,
};

const PureDevicesList = pure(DevicesList);

export default connect(mapState, mapDispatch)(PureDevicesList);
