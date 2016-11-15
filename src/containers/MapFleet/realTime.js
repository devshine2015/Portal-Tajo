import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';

import GooglePlacesSearch from 'components/GooglePlacesSearch';

import MapVehicle from './components/MapVehicle';
import MapGF from './components/MapGF';
import EditGF from './components/EditGF';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import { createMapboxMap } from 'utils/mapBoxMap';
import { initiateGfEditingCallback } from 'containers/GFEditor/utils';
import { mapStoreSetView, mapStoreGetView } from './reducerAction';

import { gfEditUpdate } from 'containers/GFEditor/actions';
import { gfEditIsEditing } from 'containers/GFEditor/reducer';

import * as mapEvents from './events';
import * as listEvents from 'containers/Operational/components/OperationalPowerList/events';
import listTypes from 'components/InstancesList/types';

const selectForMe = (meThis, hookId) => (id) => {
  meThis.selectMarker(hookId, id);
};

const EMPTY_ARRAY = [];

class MapFleet extends React.Component {
  constructor(props) {
    super(props);
    this.theMap = null;

    this.state = {
      detailedList: listTypes.withVehicleDetails,
      selectedVehicleId: undefined,
      selectedLocationId: undefined,
    };

    this.props.eventDispatcher.registerHandler(listEvents.OPS_LIST_ITEM_SELECTED,
      ((meThis) => (id) => { meThis.highLightMarker(id); })(this));
    this.props.eventDispatcher.registerHandler(listEvents.OPS_LIST_TAB_SWITCH,
      ((meThis) => (tabType, cb) => { meThis.listTabChange(tabType, cb); })(this));
  }

  componentDidMount() {
    this.createMapboxMap();
    this.vehicleMarkersLayer = window.L.layerGroup();
    this.theMap.addLayer(this.vehicleMarkersLayer);
    this.gfMarkersLayer = window.L.layerGroup();
    this.theMap.addLayer(this.gfMarkersLayer);
    this.gfEditLayer = window.L.layerGroup();
    this.theMap.addLayer(this.gfEditLayer);

// providing continuous UX - same vehicle selected when switching from other screens
// TODO: NOT GOOD - relies on Mounting order, expects powerList to be already up
//
    const globalSelectedVehicleId = this.props.gloablSelctedVehicleId;
    if (globalSelectedVehicleId !== '') {
      this.selectMarker(mapEvents.MAP_VEHICLE_SELECTED, globalSelectedVehicleId);
    }
  }

  componentWillUnmount() {
    // TODO: need to shutdown the mapbox object?
    this.props.mapStoreSetView(this.theMap.getCenter(), this.theMap.getZoom());
  }

  createMapboxMap() {
    // if already existing
    if (this.theMap !== null) {
      return;
    }
    this.theMap = createMapboxMap(ReactDOM.findDOMNode(this), this.props.mapStoreGetView);
    this.theMap.on('contextmenu', initiateGfEditingCallback(this.theMap, this.props.gfEditUpdate));
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
  // PowerList switched (vehicles to GF, etc)
  listTabChange(listType, cb) {
    this.setState({ detailedList: listType }, () => {
      cb();
    });
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
          isDetailViewActivated={this.state.detailedList === listTypes.withVehicleDetails}
          theLayer={this.vehicleMarkersLayer}
          theVehicle={v}
          onClick={selectForMe(this, mapEvents.MAP_VEHICLE_SELECTED)}
        />
      ));
      gfs = this.props.gfs.map((v) => (
        <MapGF
          key={v.id}
          isSelected={this.state.selectedLocationId === v.id}
          isDetailViewActivated={this.state.detailedList === listTypes.withGFDetails}
          theLayer={this.gfMarkersLayer}
          theGF={v}
          onClick={selectForMe(this, mapEvents.MAP_GF_SELECTED)}
        />
      ));
    }
    const editGF = !this.props.gfEditMode ? false :
     (<EditGF
       key="gfEditHelper"
       theLayer={this.gfEditLayer}
     />);
    //  <GooglePlacesSearch ownerMapObj={this.theMap} />
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
  gfEditUpdate: React.PropTypes.func.isRequired,
  mapStoreSetView: React.PropTypes.func.isRequired,
  mapStoreGetView: React.PropTypes.object.isRequired,
  gloablSelctedVehicleId: React.PropTypes.string.isRequired,
};
const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
  vehicleById: fromFleetReducer.getVehicleByIdFunc(state),
  gfById: fromFleetReducer.getGFByIdFunc(state),
  gfEditMode: gfEditIsEditing(state),
  mapStoreGetView: mapStoreGetView(state),
  gloablSelctedVehicleId: fromFleetReducer.getSelectedVehicleId(state),
});
const mapDispatch = {
  gfEditUpdate,
  mapStoreSetView,
};
export default connect(mapState, mapDispatch)(PureMapFleet);
