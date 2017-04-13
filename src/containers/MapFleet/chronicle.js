import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';

import CustomControls from './components/CustomControls';
import ChroniclePath from './components/ChroniclePath';
import ChronicleMarker from './components/ChronicleMarker';
import ChronicleEventMarker from './components/ChronicleEventMarker';
// import MapGF from './components/MapGF';
// import { mapGFMarkerMaker } from './components/MapGF';
import EditGF from 'containers/GFEditor/MapComponenet';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getInstanceChronicleFrameById } from 'containers/Chronicle/reducer';
import { ctxGetHideGF } from 'services/Global/reducers/contextReducer';

import { createMapboxMap, hideLayer } from 'utils/mapBoxMap';
import { contextMenuAddGFItems } from 'containers/GFEditor/utils';
import { mapStoreSetView, mapStoreGetView } from './reducerAction';

import { gfEditUpdate } from 'containers/GFEditor/actions';
import { gfEditIsEditing } from 'containers/GFEditor/reducer';

import listTypes from 'components/InstancesList/types';

import styles from './styles.css';

class MapChronicle extends React.Component {

  constructor(props) {
    super(props);
    this.theMap = null;
  }

  componentDidMount() {
    this.createMapboxMap();
    this.vehicleMarkersLayer = window.L.layerGroup();
    this.theMap.addLayer(this.vehicleMarkersLayer);
    this.gfMarkersLayer = window.L.layerGroup();
    this.theMap.addLayer(this.gfMarkersLayer);
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
      contextMenuAddGFItems(this.props.gfEditUpdate)
    );
    // this.theMap.on('contextmenu', initiateGfCircleEditingCallback(this.theMap, this.props.gfEditUpdate));
  }

  // make all the on-map markers - helpers for render
  makeChronoPath = (v) => {
    const vehCronicleFrame = this.props.getInstanceChronicleFrameById(v.id);
    if (!vehCronicleFrame.isValid() || !vehCronicleFrame.hasPositions()) {
      return false;
    }
    return (
          <ChroniclePath
            key={`${v.id}CrP`}
            theLayer={this.theMap}
            chronicleFrame={vehCronicleFrame}
            isSelected={this.props.selectedVehicle !== null
              && this.props.selectedVehicle.id === v.id}
          />
        );
  };
  makeChronoMarker = (v) => {
    const vehCronicleFrame = this.props.getInstanceChronicleFrameById(v.id);
    if (!vehCronicleFrame.isValid() || !vehCronicleFrame.hasPositions()) {
      return false;
    }
    return (
        <ChronicleMarker
          key={`${v.id}CrM`}
          theLayer={this.theMap}
          chronicleFrame={vehCronicleFrame}
          isSelected={this.props.selectedVehicle !== null
            && this.props.selectedVehicle.id === v.id}
        />
        );
  }
  makeChronoEventMarker = (v, idx) => (
            <ChronicleEventMarker
              key={`${this.props.selectedVehicle.id + idx}CrSt`}
              theLayer={this.theMap}
              chronicleEvent={v}
            />
          );
  makeGFMarker = (v) => ({});

  render() {
    if (this.theMap === null) {
      return (<div className = {styles.mapContainer}>
              <CustomControls theMap={this.theMap} overrideListType={listTypes.withVehicleDetails} />
              </div>);
    }
    const hideGF = this.props.gfEditMode || this.props.isHideGF;
    hideLayer(this.theMap, this.vehicleMarkersLayer, this.props.gfEditMode);
    hideLayer(this.theMap, this.gfMarkersLayer, hideGF);

    let stopEvents = [];

    if (this.props.selectedVehicle !== null) {
      const vehCronicleFrame = this.props
                  .getInstanceChronicleFrameById(this.props.selectedVehicle.id);
      if (vehCronicleFrame.isValid()
      && vehCronicleFrame.hasPositions()
      && vehCronicleFrame.stopEvents.length > 0) {
        stopEvents = vehCronicleFrame.stopEvents.map(this.makeChronoEventMarker);
      }
    }

    const editGF = !this.props.gfEditMode ? false :
     (<EditGF
       key="gfEditHelper"
       theMap={this.theMap}
     />);

    return (
      <div className = {styles.mapContainer}>

      <CustomControls theMap={this.theMap} overrideListType={listTypes.withVehicleDetails} />
      {this.props.gfs.map(this.makeGFMarker)}
      {this.props.vehicles.map(this.makeChronoPath)}
      {this.props.vehicles.map(this.makeChronoMarker)}
      {editGF}
      {stopEvents}
      </div>
    );
  }
}

MapChronicle.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
  gfById: React.PropTypes.func.isRequired,
  gfEditMode: React.PropTypes.bool.isRequired,
  selectedVehicle: React.PropTypes.object,
  gfEditUpdate: React.PropTypes.func.isRequired,
  mapStoreSetView: React.PropTypes.func.isRequired,
  mapStoreGetView: React.PropTypes.object.isRequired,
  getInstanceChronicleFrameById: React.PropTypes.func.isRequired,
  isHideGF: React.PropTypes.bool.isRequired,
};
const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
  gfById: fromFleetReducer.getGFByIdFunc(state),
  gfEditMode: gfEditIsEditing(state),
  mapStoreGetView: mapStoreGetView(state),
  getInstanceChronicleFrameById: getInstanceChronicleFrameById(state),
  isHideGF: ctxGetHideGF(state),
});
const mapDispatch = {
  gfEditUpdate,
  mapStoreSetView,
};
export default connect(mapState, mapDispatch)(pure(MapChronicle));
