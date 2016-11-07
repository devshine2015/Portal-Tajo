import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';

import GooglePlacesSearch from 'components/GooglePlacesSearch';

import ChroniclePath from './components/ChroniclePath';
import ChronicleMarker from './components/ChronicleMarker';
import ChronicleEventMarker from './components/ChronicleEventMarker';
import MapGF from './components/MapGF';
import EditGF from './components/EditGF';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getInstanceChronicleFrameById } from 'containers/Chronicle/reducer';

import { createMapboxMap } from 'utils/mapBoxMap';
import { initiateGfEditingCallback } from 'containers/GFEditor/utils';
import { mapStoreSetView, mapStoreGetView } from './reducerAction';

import { gfEditUpdate } from 'containers/GFEditor/actions';
import { gfEditIsEditing } from 'containers/GFEditor/reducer';

const EMPTY_ARRAY = [];

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
    this.gfEditLayer = window.L.layerGroup();
    this.theMap.addLayer(this.gfEditLayer);
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

    let gfs = EMPTY_ARRAY;
    let chronPaths = EMPTY_ARRAY;
    let chronMarkers = EMPTY_ARRAY;
    let stopEvents = EMPTY_ARRAY;

    if (this.theMap !== null) {
      // gfs = this.props.gfs.map((v) => (
      //   <MapGF
      //     key={v.id}
      //     isSelected={false}
      //     isDetailViewActivated={false}
      //     theLayer={this.gfMarkersLayer}
      //     theGF={v}
      //     onClick={ () => {} }
      //   />
      // ));
      chronPaths = this.props.vehicles.map((v) => {
        const vehCronicleFrame = this.props.getInstanceChronicleFrameById(v.id);
        if (!vehCronicleFrame.isValid() || vehCronicleFrame.isEmpty()) {
          return false;
        }
        return (
          <ChroniclePath
            key={v.id + 'CrP'}
            theLayer={this.theMap}
            chronicleFrame={vehCronicleFrame}
            isSelected={this.props.selectedVehicle !== null
              && this.props.selectedVehicle.id === v.id}
          />
        );
      });
      chronMarkers = this.props.vehicles.map((v) => {
        const vehCronicleFrame = this.props.getInstanceChronicleFrameById(v.id);
        if (!vehCronicleFrame.isValid() || vehCronicleFrame.isEmpty()) {
          return false;
        }
        return (
        <ChronicleMarker
          key={v.id + 'CrM'}
          theLayer={this.theMap}
          chronicleFrame={vehCronicleFrame}
          isSelected={this.props.selectedVehicle !== null
            && this.props.selectedVehicle.id === v.id}
        />
        );
      });
      if (this.props.selectedVehicle !== null) {
        const vehCronicleFrame = this.props
                    .getInstanceChronicleFrameById(this.props.selectedVehicle.id);
        if (vehCronicleFrame.isValid()
        && !vehCronicleFrame.isEmpty()
        && vehCronicleFrame.stopEvents.length > 0) {
          stopEvents = vehCronicleFrame.stopEvents.map((v, idx) => (
            <ChronicleEventMarker
              key={this.props.selectedVehicle.id + idx + 'CrSt'}
              theLayer={this.theMap}
              chronicleEvent={v}
            />
          ));
        }
      }
    }
    const editGF = !this.props.gfEditMode ? false :
     (<EditGF
       key="gfEditHelper"
       theLayer={this.gfEditLayer}
     />);
    return (
      <div className = {styles.mapContainer}>
      <GooglePlacesSearch ownerMapObj={this.theMap} />
      {gfs}
      {chronPaths}
      {chronMarkers}
      {editGF}
      {stopEvents}
      </div>
    );
  }
}

MapChronicle.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
  vehicleById: React.PropTypes.func.isRequired,
  gfById: React.PropTypes.func.isRequired,
  gfEditMode: React.PropTypes.bool.isRequired,
  selectedVehicle: React.PropTypes.object,
  gfEditUpdate: React.PropTypes.func.isRequired,
  mapStoreSetView: React.PropTypes.func.isRequired,
  mapStoreGetView: React.PropTypes.object.isRequired,
  getInstanceChronicleFrameById: React.PropTypes.func.isRequired,
};
const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
  vehicleById: fromFleetReducer.getVehicleByIdFunc(state),
  gfById: fromFleetReducer.getGFByIdFunc(state),
  gfEditMode: gfEditIsEditing(state),
  mapStoreGetView: mapStoreGetView(state),
  getInstanceChronicleFrameById: getInstanceChronicleFrameById(state),
});
const mapDispatch = {
  gfEditUpdate,
  mapStoreSetView,
};
const PureMapChronicle = pure(MapChronicle);
export default connect(mapState, mapDispatch)(PureMapChronicle);
