import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import listTypes from 'components/InstancesList/types';
import { vehiclesActions, gfActions } from 'services/FleetModel/actions';

class InstancesColumn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentExpandedVehicle: undefined,
      currentExpandedLocation: undefined,
    };
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
            <Filter filterFunc={this.props.filterVehiclesFunc} />
            <VehiclesList
              currentExpandedItem={this.state.currentExpandedVehicle}
              onItemClick={this.onVehicleClick}
              data={this.props.vehicles}
              type={listTypes.withVehicleDetails}
            />
          </Tab>
          <Tab label="Locations">
            <Filter filterFunc={this.props.filterGFsFunc} />
            <VehiclesList
              currentExpandedItem={this.state.currentExpandedLocation}
              onItemClick={this.onLocationClick}
              data={this.props.gfs}
              type={listTypes.withLocationDetails}
            />
          </Tab>
        </Tabs>
      </PowerList>
    );
  }
}

InstancesColumn.propTypes = {
  vehicles: React.PropTypes.object.isRequired,
  hooks: React.PropTypes.func.isRequired,
  gfs: React.PropTypes.array.isRequired,
  setUpHooks: React.PropTypes.func.isRequired,
  filterVehiclesFunc: React.PropTypes.func.isRequired,
  filterGFsFunc: React.PropTypes.func.isRequired,
};

InstancesColumn.propTypes = {};

const mapDispatch = {
  filterVehiclesFunc: vehiclesActions.filterVehicles,
  filterGFsFunc: gfActions.filterGFs,
};

const PureComponent = pure(InstancesColumn);

export default connect(null, mapDispatch)(PureComponent);

