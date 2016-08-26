import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import ItemsList from 'components/InstancesList';
import listTypes from 'components/InstancesList/types';
import { vehiclesActions, gfActions } from 'services/FleetModel/actions';
import * as listEvents from './events';
import * as mapEvents from 'containers/MapFleet/events';

class InstancesColumn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentExpandedVehicleId: undefined,
      currentExpandedGFId: undefined,
    };

    props.eventDispatcher.registerHandler(mapEvents.MAP_VEHICLE_SELECTED, this.onVehicleClick);
    props.eventDispatcher.registerHandler(mapEvents.MAP_GF_SELECTED, this.onGFClick);
  }

  onGFClick = (itemId, isExpanded = true) => {
    this.onItemClick(itemId, isExpanded, 'location');
  }

  onVehicleClick = (itemId, isExpanded = true) => {
    this.onItemClick(itemId, isExpanded, 'vehicle');
  }

  onItemClick = (itemId, isExpanded, type) => {
    this.props.eventDispatcher.fireEvent(listEvents.OPS_LIST_ITEM_SELECTED, itemId);

    const value = isExpanded ? itemId : undefined;

    switch (type) {
      case 'vehicle': {
        this.setState({
          currentExpandedVehicleId: value,
        });
        break;
      }
      case 'location': {
        this.setState({
          currentExpandedGFId: value,
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
            <ItemsList
              currentExpandedItemId={this.state.currentExpandedVehicleId}
              onItemClick={this.onVehicleClick}
              data={this.props.vehicles}
              type={listTypes.withVehicleDetails}
            />
          </Tab>
          <Tab label="Locations">
            <Filter filterFunc={this.props.filterGFsFunc} />
            <ItemsList
              currentExpandedItemId={this.state.currentExpandedGFId}
              onItemClick={this.onGFClick}
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
  gfs: React.PropTypes.array.isRequired,
  eventDispatcher: React.PropTypes.object.isRequired,
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
