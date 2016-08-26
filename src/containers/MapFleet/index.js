import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';
require('mapbox.js'); // <-- auto-attaches to window.L
require('leaflet/dist/leaflet.css');
// require('leaflet-editable/handler/Edit.SimpleShape');
// require('leaflet-editable/handler/Edit.Circle');
require('leaflet-draw');


import MapVehicle from './components/MapVehicle';
import MapGF from './components/MapGF';
import EditGF from './components/EditGF';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { MAPBOX_KEY, ZERO_LOCATION, ZERO_ZOOM, NEW_GF_REQUIRED_ZOOM_LEVEL } from 'utils/constants';

import * as mapEvents from './events';
import * as listEvents from 'components/OperationalPowerList/events';

const selectForMe = (meThis, hookId) => (id) => {
  meThis.selectMarker(hookId, id);
};

const EMPTY_ARRAY = [];

class MapFleet extends React.Component {

  constructor(props) {
    super(props);
    this.theMap = null;
    this.refPos = window.L.latLng(ZERO_LOCATION);

    this.state = {
//      gfEditMode: false,
      selectedVehicleId: undefined,
      selectedLocationId: undefined,
    };

    this.props.eventDispatcher.registerHandler(listEvents.OPS_LIST_ITEM_SELECTED,
      ((meThis) => (id) => { meThis.highLightMarker(id); })(this));
  }

  componentDidMount() {
    this.createMapboxMap();
    this.vehicleMarkersLayer = window.L.layerGroup();
    this.theMap.addLayer(this.vehicleMarkersLayer);
    this.gfMarkersLayer = window.L.layerGroup();
    this.theMap.addLayer(this.gfMarkersLayer);
    this.gfEditLayer = window.L.layerGroup();
    this.theMap.addLayer(this.gfEditLayer);

    // do this to resize map on div
    window.setTimeout(
     (((map) => () => {
       map.invalidateSize(true);
     })(this.theMap)),
      500);
  }

  setRefPos(pos) {
    this.refPos = pos;
  }

  createMapboxMap() {
    // if already existing
    if (this.theMap !== null) {
      return;
    }
    const domNode = ReactDOM.findDOMNode(this);
    window.L.mapbox.accessToken = MAPBOX_KEY;
    this.theMap = window.L.mapbox.map(domNode);
    this.theMap.setView(ZERO_LOCATION, ZERO_ZOOM);

    this.theMap.on('contextmenu', (e) => ((inThis) => {
      if (inThis.props.gfEditMode) { // already editing?
        return;
      }
      inThis.setRefPos(e.latlng);
      inThis.props.eventDispatcher.fireEvent(mapEvents.MAP_GF_ADD, { obj: null, pos: e.latlng });
      if (inThis.theMap.getZoom() < NEW_GF_REQUIRED_ZOOM_LEVEL) {
        inThis.theMap.setZoomAround(e.latlng, NEW_GF_REQUIRED_ZOOM_LEVEL);
      }
    })(this));

    const tilesOSM = window.L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });
    window.L.control.layers({
      StreetsDef: window.L.mapbox.tileLayer('mapbox.streets'),
      Streets: tilesOSM.addTo(this.theMap),
      Satelite: window.L.mapbox.tileLayer('mapbox.streets-satellite'),
      Emerald: window.L.mapbox.tileLayer('mapbox.emerald'),
      Run: window.L.mapbox.tileLayer('mapbox.run-bike-hike'),
      Light: window.L.mapbox.tileLayer('mapbox.light'),
      Dark: window.L.mapbox.tileLayer('mapbox.dark'),
      Wheat: window.L.mapbox.tileLayer('mapbox.wheatpaste'),
      Basic: window.L.mapbox.tileLayer('mapbox.streets-basic'),
      Outdoors: window.L.mapbox.tileLayer('mapbox.outdoors'),
      Pencil: window.L.mapbox.tileLayer('mapbox.pencil'),
    },
    {},
    { position: 'topleft' }).addTo(this.theMap);
  }

// when selected from the list
  highLightMarker(selectedId) {
    let theSelectedObj = this.props.vehicleById(selectedId);
    if (theSelectedObj === null) {
      theSelectedObj = this.props.gfById(selectedId);
      this.setState({ selectedLocationId: selectedId });
    } else {
      this.setState({ selectedVehicleId: selectedId });
    }
    const bounds = this.theMap.getBounds();
    if (!bounds.contains(theSelectedObj.pos)) {
      this.theMap.panTo(theSelectedObj.pos);
    }
  }
// when clicked
  selectMarker(hookId, selectedId) {
    this.props.eventDispatcher.fireEvent(hookId, selectedId);
  }

  hideLayer(theLayer, doHide) {
    if (this.theMap === null) return;
    if (doHide) {
      if (this.theMap.hasLayer(theLayer)) {
        this.theMap.removeLayer(theLayer);
      }
    } else {
      if (!this.theMap.hasLayer(theLayer)) {
        this.theMap.addLayer(theLayer);
      }
    }
  }

  render() {
    this.hideLayer(this.vehicleMarkersLayer, this.props.gfEditMode);
    this.hideLayer(this.gfMarkersLayer, this.props.gfEditMode);
    this.hideLayer(this.gfEditLayer, !this.props.gfEditMode);

    let vehicles = EMPTY_ARRAY;
    let gfs = EMPTY_ARRAY;

    if (this.theMap !== null) {
      vehicles = this.props.vehicles.map((v) => (
        <MapVehicle
          key={v.id}
          isSelected={this.state.selectedVehicleId === v.id}
          theLayer={this.vehicleMarkersLayer}
          theVehicle={v}
          onClick={selectForMe(this, mapEvents.MAP_VEHICLE_SELECTED)}
        />
      ));
      gfs = this.props.gfs.map((v) => (
        <MapGF
          key={v.id}
          isSelected={this.state.selectedLocationId === v.id}
          theLayer={this.gfMarkersLayer}
          theGF={v}
          onClick={selectForMe(this, mapEvents.MAP_GF_SELECTED)}
        />
      ));
    }
    const editGF = this.theMap === null ? false :
     (<EditGF
       key="gfEditHelper"
       theLayer={this.gfEditLayer}
       eventDispatcher={this.props.eventDispatcher}
       spawnPos={this.refPos}
     />);

    return (
      <div className = {styles.mapContainer}>
      {gfs}
      {vehicles}
      {editGF}
      </div>
    );
  }
}

const PureMapFleet = pure(MapFleet);

MapFleet.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
  eventDispatcher: React.PropTypes.object.isRequired,
  vehicleById: React.PropTypes.func.isRequired,
  gfById: React.PropTypes.func.isRequired,
  gfEditMode: React.PropTypes.bool.isRequired,
};
const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  gfs: fromFleetReducer.getGFsEx(state),
  vehicleById: fromFleetReducer.getVehicleByIdFunc(state),
  gfById: fromFleetReducer.getGFByIdFunc(state),
});
export default connect(mapState)(PureMapFleet);
