import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';
require('mapbox.js'); // <-- auto-attaches to window.L
require('leaflet/dist/leaflet.css');

import MapVehicle from './components/MapVehicle';
import MapLocation from './components/MapLocation';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { ZERO_LOCATION } from './../../utils/constants';

import * as ListEvents from 'containers/PowerList/events';
import * as MapEvents from './events';

const selectForMe = (meThis, hookId) => (id) => {
  meThis.selectMarker(hookId, id);
};

class MapFleet extends React.Component {

  constructor(props) {
    super(props);
    this.theMap = null;
    this.state = {
      selectedVehicleId: undefined,
      selectedLocationId: undefined,
    };
  }

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    window.L.mapbox.accessToken =
    'pk.eyJ1IjoiZHJ2ciIsImEiOiI3NWM4ZWE1MWEyOTVmZTQ0ZDU2OTE5OGIwNzRlMWY2NyJ9.ybLA6tItFcbyAQyxRq3Pog';
    this.theMap = window.L.mapbox.map(domNode, 'mapbox.streets');
    this.theMap.setView(ZERO_LOCATION, 12);

    // retrigger render to apply the MAP prop for markers
//    this.forceUpdate();

    window.setTimeout(
     (((map) => () => {
       map.invalidateSize(true);
     })(this.theMap)),
      500);
  }

// when selected from the list
  highLightMarker(selectedId) {
    let theSelectedObj = this.props.vehicleById(selectedId);
    if (theSelectedObj === null) {
      theSelectedObj = this.props.locationById(selectedId);
      this.setState({ selectedLocationId: selectedId });
    } else {
      this.setState({ selectedVehicleId: selectedId });
    }
    this.theMap.panTo(theSelectedObj.pos);
  }
// when clicked
  selectMarker(hookId, selectedId) {
    this.props.hooks(hookId, selectedId);
  }

  render() {
    this.props.setUpHooks(ListEvents.LIST_VEHICLE_SELECTED,
      ((meThis) => (id) => { meThis.highLightMarker(id); })(this));
    this.props.setUpHooks(ListEvents.LIST_LOC_SELECTED,
      ((meThis) => (id) => { meThis.highLightMarker(id); })(this));
    const vehicles = this.props.vehicles.map((v) => (
      <MapVehicle
        key={v.id}
        theMap={this.theMap}
        theVehicle={v}
        onClick={selectForMe(this, MapEvents.MAP_VEHICLE_SELECTED)}
      />
    ));
    const locations = this.props.locations.map((v) => (
      <MapLocation
        key={v.id}
        isSelected={this.state.selectedLocationId === v.id}
        theMap={this.theMap}
        theLocation={v}
        onClick={selectForMe(this, MapEvents.MAP_LOCATION_SELECTED)}
      />
    ));

    return (
      <div className = {styles.mapContainer}>
      {vehicles}
      {locations}
      </div>
    );
  }
}

const PureMapFleet = pure(MapFleet);

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  locations: fromFleetReducer.getLocationsEx(state),
  vehicleById: fromFleetReducer.getVehicleByIdFunc(state),
  locationById: fromFleetReducer.getLocationByIdFunc(state),
});

MapFleet.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  locations: React.PropTypes.array.isRequired,
  setUpHooks: React.PropTypes.func.isRequired,
  hooks: React.PropTypes.func.isRequired,
  vehicleById: React.PropTypes.func.isRequired,
  locationById: React.PropTypes.func.isRequired,
};

export default connect(mapState)(PureMapFleet);
