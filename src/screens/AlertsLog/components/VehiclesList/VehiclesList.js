import React from 'react';
// import pure from 'recompose/pure';
import { connect } from 'react-redux';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import { vehiclesActions } from 'services/FleetModel/actions';
import vehicleShape from 'services/FleetModel/PropTypes';
import { getPathToVehicles } from 'services/FleetModel/reducer';
import { getPathToGlobalContext } from 'services/Global/reducer';
import {
  makeGetVehicles,
  makeGetFilterString,
} from './selectors';

class AlertsVehiclesList extends React.Component {

  onItemClick = (itemId) => {
    console.log(itemId);
  }

  renderList() {
    return (
      <VehiclesList
        data={this.props.vehicles}
        selectedItems={this.props.selectedVehicles}
        onItemClick={this.onItemClick}
      />
    );
  }

  render() {
    return (
      <PowerList
        scrollable
        fixed
        filter={
          <Filter
            filterFunc={this.props.filterFunc}
            defaultValue={this.props.filterString}
          />
        }
        content={this.renderList()}
      />
    );
  }
}

AlertsVehiclesList.propTypes = {
  filterFunc: React.PropTypes.func.isRequired,
  vehicles: React.PropTypes.arrayOf(
    React.PropTypes.shape(vehicleShape).isRequired,
  ).isRequired,
  // array of ids
  selectedVehicles: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired,
  ),
  filterString: React.PropTypes.string,
};

AlertsVehiclesList.defaultProps = {
  filterString: '',
  selectedVehicles: [],
};

const makeMapStateToProps = () => {
  const getVehicles = makeGetVehicles();
  const getFilterString = makeGetFilterString();

  const mapState = (state) => {
    const vehicles = getVehicles(getPathToVehicles(state));
    const filterString = getFilterString(getPathToGlobalContext(state));

    return {
      vehicles,
      filterString,
    };
  };

  return mapState;
};

const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
};

export default connect(makeMapStateToProps, mapDispatch)(AlertsVehiclesList);

