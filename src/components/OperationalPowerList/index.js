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

  onTabChange = (value) => {
    this.props.eventDispatcher.fireEvent(listEvents.OPS_LIST_TAB_SWITCH, value);
  }

// style={{ backgroundColor: this.context.muiTheme.palette.PLItemBackgroundColorExpanded }}
// style={{ backgroundColor: this.context.muiTheme.palette.PLItemGFBackgroundColorExpanded }}
//
  render() {
    return (
      <PowerList>
        <Tabs inkBarStyle={ { backgroundColor: 'rgba(255,255,255,0.5)' } }
          onChange = {this.onTabChange}
        >
          <Tab label="Vehicles" value={listTypes.withVehicleDetails}>
            <Filter filterFunc={this.props.filterVehiclesFunc} />
            <ItemsList
              currentExpandedItemId={this.state.currentExpandedVehicleId}
              onItemClick={this.onVehicleClick}
              data={this.props.vehicles}
              type={listTypes.withVehicleDetails}
            />
          </Tab>
          <Tab label="Locations" value={listTypes.withGFDetails} >
            <Filter filterFunc={this.props.filterGFsFunc} />
            <ItemsList
              currentExpandedItemId={this.state.currentExpandedGFId}
              onItemClick={this.onGFClick}
              data={this.props.gfs}
              type={listTypes.withGFDetails}
            />
          </Tab>
        </Tabs>
      </PowerList>
    );
  }
}

InstancesColumn.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
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
