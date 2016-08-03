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

import * as ListEvents from 'components/PowerListContainer/events';
import * as MapEvents from './events';

const highLightForMe = (meThis) => (id) => {
  meThis.highLightMarker(id);
};
const selectForMe = (meThis, hookId) => (id) => {
  meThis.selectMarker(hookId, id);
};

class MapFleet extends React.Component {

  constructor(props) {
    super(props);
    this.theMap = null;
  }

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    window.L.mapbox.accessToken =
    'pk.eyJ1IjoiZHJ2ciIsImEiOiI3NWM4ZWE1MWEyOTVmZTQ0ZDU2OTE5OGIwNzRlMWY2NyJ9.ybLA6tItFcbyAQyxRq3Pog';
    this.theMap = window.L.mapbox.map(domNode, 'mapbox.streets');
    this.theMap.setView(ZERO_LOCATION, 12);

    // retrigger render to apply the MAP prop for markers
    this.forceUpdate();

    window.setTimeout(
     (function (map) {
       return () => {
         map.invalidateSize(true);
       };
     }(this.theMap)),
      500);
  }

// when selected from the list
  highLightMarker(selectedId) {
    const theVehicle = this.props.vehicleById(selectedId);
    // console.log('highLighting MARKER for '+selectedId);
    // console.log('highLighting name '+theVehicle.name);
    this.theMap.panTo(theVehicle.pos);
  }
// when clicked
  selectMarker(hookId, selectedId) {
    this.props.hooks(hookId, selectedId);
  }

  render() {
    this.props.setUpHooks(ListEvents.LIST_VEHICLE_SELECTED, highLightForMe(this));
    const vehicles = this.props.vehicles.map((v) => (
      <MapVehicle key={v.id} theMap={this.theMap} theVehicle={v} onClick={selectForMe(this, MapEvents.MAP_VEHICLE_SELECTED)} />
    ));
    const locations = this.props.locations.map((v) => (
      <MapLocation key={v.id} theMap={this.theMap} theLocation={v} onClick={selectForMe(this, MapEvents.MAP_LOCATION_SELECTED)} />
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
});

MapFleet.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  locations: React.PropTypes.array.isRequired,
  setUpHooks: React.PropTypes.func.isRequired,
  hooks: React.PropTypes.func.isRequired,
  vehicleById: React.PropTypes.func.isRequired,
};

export default connect(mapState)(PureMapFleet);
