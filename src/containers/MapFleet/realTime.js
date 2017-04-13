import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import pure from 'recompose/pure';

import MapVehicle from './components/MapVehicle';
// import { mapGFMarkerMaker } from './components/MapGF';
import EditGF from 'containers/GFEditor/MapComponenet';
import { mapMWAJobMarkerMaker } from './components/MWAJobMarker';
import CustomControls from './components/CustomControls';
import MapRoute from './components/MapRoute';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';

import { isMwa } from 'configs';
import { getMWAJobs, getMWASelectedJobId } from 'services/MWA/reducer';

import { contextMenuAddGFItems } from 'containers/GFEditor/utils';
import { createMapboxMap, hideLayer } from 'utils/mapBoxMap';
import directions from 'utils/mapServices/google/directions';
import distanceMatrixToSingleDst from 'utils/mapServices/google/distanceMatrix';

import { showSnackbar } from 'containers/Snackbar/actions';

// TODO: remove; this must be in the global/contextReducer
import { mapStoreSetView, mapStoreGetView } from './reducerAction';
// TODO: remove over
import { ctxGetHideGF,
        ctxGetHideVehicles,
        ctxGetPowListTabType } from 'services/Global/reducers/contextReducer';

import { gfEditUpdate } from 'containers/GFEditor/actions';
import { gfEditIsEditing } from 'containers/GFEditor/reducer';

import * as mapEvents from './events';
import * as listEvents from 'containers/Operational/components/OperationalPowerList/events';
import listTypes from 'components/InstancesList/types';

import styles from './styles.css';

const selectForMe = (meThis, hookId) => (id) => {
  meThis.selectMarker(hookId, id);
};

class MapFleet extends React.Component {
  constructor(props) {
    super(props);
    this.theMap = null;

    this.state = {
      detailedList: listTypes.withVehicleDetails,
      selectedVehicleId: undefined,
      selectedLocationId: undefined,
      routeObj: null,
    };

    this.props.eventDispatcher.registerHandler(listEvents.OPS_LIST_ITEM_SELECTED,
      ((meThis) => (id) => { meThis.highLightMarker(id); })(this));
    this.props.eventDispatcher.registerHandler(listEvents.OPS_LIST_TAB_SWITCH,
      ((meThis) => (tabType, cb) => { meThis.listTabChange(tabType, cb); })(this));
  }

  componentDidMount() {
    this.createMapboxMap();
    this.vehicleMarkersLayer = window.L.layerGroup();
    this.gfMarkersLayer = window.L.layerGroup();
    hideLayer(this.theMap, this.vehicleMarkersLayer, false);
    hideLayer(this.theMap, this.gfMarkersLayer, false);

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
    this.theMap = createMapboxMap(ReactDOM.findDOMNode(this),
      this.props.mapStoreGetView,
      contextMenuAddGFItems(this.props.gfEditUpdate,
        this.routeSelectedVechicleToLatLng,
        this.nearestVechicleToLatLng)
        // (isMwa ? this.nearestVechicleToLatLng : null))
    );
  }

//
// ---------------- routing/distance related callbacks ------------------------------------------------
// TODO: move it to separate place?
  haveRoute = (latLngArray, durationMS, distanceM) => {
    this.setState({ routeObj: {
      pathLatLngs: latLngArray,
      durationMS,
      distanceM,
      destination: latLngArray[latLngArray.length - 1],
    } });
  }

  routeSelectedVechicleToLatLng = (toLatLng) => {
    const v = getVehicleById(this.state.selectedVehicleId, this.props.vehicles);
    const selectedVehicle = (v !== undefined && v.vehicle !== undefined) ? v.vehicle : null;
    if (selectedVehicle===null){
      this.props.showSnackbar('Select a vehicle first', 3000);
      return;
    }
    this.routeFromToPos(selectedVehicle.pos, [toLatLng.lat, toLatLng.lng]);
  }

  routeFromToPos = (fromPos, toPos) => {
    directions(fromPos, toPos, this.haveRoute, this.noHaveCallback);
  }

  haveDistMatrix = (resultsArray) => {
    let bestIdx = 0;
    // find idx of the closes one
    resultsArray.forEach((aRes, idx) => {if (resultsArray[bestIdx].distanceM > aRes.distanceM) bestIdx = idx; });
    // find idx of the closes one in TIME
    // resultsArray.forEach((aRes, idx) => {if (resultsArray[bestIdx].durationMS > aRes.durationMS) bestIdx = idx; });

// console.log(resultsArray);
// console.log(`  >>>>  ${bestIdx}`);
    this.selectMarker(mapEvents.MAP_VEHICLE_SELECTED, this.cachedVehicles[bestIdx].id);
    this.routeFromToPos(this.cachedVehicles[bestIdx].pos, this.refPos);
  }
  nearestVechicleToLatLng = (toLatLng) => {
    this.refPos = [toLatLng.lat, toLatLng.lng];
    this.cachedVehicles = [];
    const originsPos = this.props.vehicles
        .filter(aVehicle => !aVehicle.filteredOut)
        .map(aVehicle => {
          aVehicle.toRefPointDst = window.L.latLng(aVehicle.pos).distanceTo(toLatLng);
          return aVehicle;
        })
        .sort((a, b) => a.toRefPointDst - b.toRefPointDst)
        .slice(0, 20)
        .map(aVehicle => {this.cachedVehicles.push(aVehicle); return aVehicle.pos;});

    distanceMatrixToSingleDst(originsPos, this.refPos, this.haveDistMatrix, this.noHaveCallback);
  }

  noHaveCallback = () => {
    this.props.showSnackbar('Can not find routes :(', 3000);
  }
//
// ---------------- routing/distance related callbacks OVER ------------------------------------------------
//

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
  makeGFMarker = (v) => ({});

  makeVehicleMarker = (v) => (
        <MapVehicle
          key={v.id}
          isSelected={this.state.selectedVehicleId === v.id}
          isDetailViewActivated={this.state.detailedList === listTypes.withVehicleDetails}
          theLayer={this.vehicleMarkersLayer}
          theVehicle={v}
          onClick={selectForMe(this, mapEvents.MAP_VEHICLE_SELECTED)}
        />
      );

  makeMWAMarker = (v) => (mapMWAJobMarkerMaker(v, this.gfMarkersLayer,
        this.props.mwaSelectedId === v.id, this.state.selectedVehicleId === v.vehicleId));

  render() {
    if (this.theMap === null) {
      return (<div className = {styles.mapContainer}>
              <CustomControls theMap={this.theMap} />
              </div>);
    }

    const shouldHideGFs = this.props.gfEditMode ||
          this.props.isHideGF && this.props.activeListType === listTypes.withVehicleDetails;
    const shouldHideVehicles = this.props.gfEditMode ||
          this.props.isHideVehicles && this.props.activeListType === listTypes.withGFDetails;
    hideLayer(this.theMap, this.vehicleMarkersLayer, shouldHideVehicles);
    hideLayer(this.theMap, this.gfMarkersLayer, shouldHideGFs);

    const editGF = !this.props.gfEditMode ? false :
     (<EditGF
       key="gfEditHelper"
       theMap={this.theMap}
     />);

    return (
      <div className={styles.mapContainer}>

        <CustomControls theMap={this.theMap} />

        {this.props.gfs.map(this.makeGFMarker)}
        {this.props.vehicles.map(this.makeVehicleMarker)}
        {editGF}
        {isMwa && this.props.mwaJobs.map(this.makeMWAMarker)}
        <MapRoute
          theLayer={this.vehicleMarkersLayer}
          routeObj={this.state.routeObj}
        />
      </div>
    );
  }
}

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
  isHideGF: React.PropTypes.bool.isRequired,
  isHideVehicles: React.PropTypes.bool.isRequired,
  activeListType: React.PropTypes.string,
  showSnackbar: React.PropTypes.func.isRequired,
  mwaJobs: React.PropTypes.array.isRequired,
  mwaSelectedId: React.PropTypes.string,
};
const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
  vehicleById: fromFleetReducer.getVehicleByIdFunc(state),
  gfById: fromFleetReducer.getGFByIdFunc(state),
  gfEditMode: gfEditIsEditing(state),
  mapStoreGetView: mapStoreGetView(state),
  gloablSelctedVehicleId: fromFleetReducer.getSelectedVehicleId(state),
  isHideGF: ctxGetHideGF(state),
  isHideVehicles: ctxGetHideVehicles(state),
  activeListType: ctxGetPowListTabType(state),
  mwaJobs: getMWAJobs(state),
  mwaSelectedId: getMWASelectedJobId(state),
});
const mapDispatch = {
  gfEditUpdate,
  mapStoreSetView,
  showSnackbar,
};
export default connect(mapState, mapDispatch)(pure(MapFleet));
