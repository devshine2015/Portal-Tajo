import React from 'react';
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
  filterFunc: React.PropTypes.func.isRequired,
  selectVehicle: React.PropTypes.func.isRequired,
  vehicles: React.PropTypes.arrayOf(
    React.PropTypes.shape(vehicleShape).isRequired,
  ).isRequired,
  // array of ids
  selectedVehicles: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired,
  ),
  selectedVehicleId: React.PropTypes.string,
  filterString: React.PropTypes.string,
};

AlertsVehiclesList.defaultProps = {
  selectedVehicleId: undefined,
  filterString: '',
  selectedVehicles: [],
};

export default AlertsVehiclesList;
