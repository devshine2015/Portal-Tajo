import React from 'react';
import PropTypes from 'prop-types';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import vehicleShape from 'services/FleetModel/PropTypes';

class AlertsVehiclesList extends React.Component {

  onItemClick = (vehicleId) => {
    this.props.selectVehicle(vehicleId);
  }

  renderList() {
    return (
      <VehiclesList
        data={this.props.vehicles}
        selectedItems={this.props.selectedVehicles}
        onItemClick={this.onItemClick}
        currentExpandedItemId={this.props.selectedVehicleId}
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
  filterFunc: PropTypes.func.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  vehicles: PropTypes.arrayOf(
    PropTypes.shape(vehicleShape).isRequired,
  ).isRequired,
  // array of ids
  selectedVehicles: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
  selectedVehicleId: PropTypes.string,
  filterString: PropTypes.string,
};

AlertsVehiclesList.defaultProps = {
  selectedVehicleId: undefined,
  filterString: '',
  selectedVehicles: [],
};

export default AlertsVehiclesList;
