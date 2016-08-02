import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';
require('mapbox.js'); // <-- auto-attaches to window.L
require('leaflet/dist/leaflet.css');

import MapVehicle from './components/MapVehicle';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';

const highLightForMe = (meThis) => (id) => {
  meThis.highLightMarker(id);
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
    this.theMap.setView([40, -74.50], 12);

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

  highLightMarker(selectedId) {
    const theVehicle = this.props.vehicleById(selectedId);
    // console.log('highLighting MARKER for '+selectedId);
    // console.log('highLighting name '+theVehicle.name);
    this.theMap.panTo(theVehicle.pos);
  }

  render() {
    this.props.setUpHooks(highLightForMe(this));
    const vehicles = this.props.vehicles.map((v) => (
      <MapVehicle key={v.id} theMap={this.theMap} theVehicle={v} />
    ));

    return (
      <div className = {styles.mapContainer}>
      {vehicles}
      </div>
    );
  }
}

const PureMapFleet = pure(MapFleet);

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  locations: fromFleetReducer.getLocations(state),
  vehicleById: fromFleetReducer.getVehicleByIdFunc(state),
});

MapFleet.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  locations: React.PropTypes.object.isRequired,
  setUpHooks: React.PropTypes.func.isRequired,
  vehicleById: React.PropTypes.func.isRequired,
};

export default connect(mapState)(PureMapFleet);
