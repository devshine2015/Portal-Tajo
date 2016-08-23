import React from 'react';
import pure from 'recompose/pure';
import { Tabs, Tab } from 'material-ui/Tabs';
// import PowerListContainer from 'containers/PowerList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import listTypes from 'components/InstancesList/types';
import { filterByName } from 'services/FleetModel/utils/vehicleHelpers';
// import * as ListTypes from 'containers/PowerList/types';

class InstancesColumn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filteredVehicles: props.vehicles,
      filteredLocations: props.locations,
      currentExpandedVehicle: undefined,
      currentExpandedLocation: undefined,
    };
  }

  onFilterVehicles = (filterString, isClearing) => {
    const filteredVehicles = filterByName(
      this.state.filteredVehicles,
      this.props.vehicles,
      filterString,
      isClearing,
    );

    this.setState({ filteredVehicles });
  }

  onFilterLocations = (filterString, isClearing) => {
    const filteredLocations = filterByName(
      this.state.filteredLocations,
      this.props.locations,
      filterString,
      isClearing,
    );

    this.setState({ filteredLocations });
  }

  onLocationClick = (itemId, isExpanded) => {
    this.onItemClick(itemId, isExpanded, 'location');
  }

  onVehicleClick = (itemId, isExpanded) => {
    this.onItemClick(itemId, isExpanded, 'vehicle');
  }

  onItemClick = (itemId, isExpanded, type) => {
    const value = isExpanded ? itemId : undefined;

    switch (type) {
      case 'vehicle': {
        this.setState({
          currentExpandedVehicle: value,
        });
        break;
      }
      case 'location': {
        this.setState({
          currentExpandedLocation: value,
        });
        break;
      }
      default: break;
    }
  }

  render() {
    return (
      <PowerList>
        <Tabs>
          <Tab label="Vehicles">
            <Filter filterFunc={this.onFilterVehicles} />
            <VehiclesList
              currentExpandedItem={this.state.currentExpandedVehicle}
              onItemClick={this.onVehicleClick}
              data={this.state.filteredVehicles}
              type={listTypes.withVehicleDetails}
            />
          </Tab>
          <Tab label="Locations">
            <Filter filterFunc={this.onFilterLocations} />
            <VehiclesList
              currentExpandedItem={this.state.currentExpandedLocation}
              onItemClick={this.onLocationClick}
              data={this.state.filteredLocations}
              type={listTypes.withLocationDetails}
            />
          </Tab>
        </Tabs>
      </PowerList>
    );
  }
}

InstancesColumn.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  locations: React.PropTypes.array.isRequired,
  hooks: React.PropTypes.func.isRequired,
  setUpHooks: React.PropTypes.func.isRequired,
};

export default pure(InstancesColumn);
