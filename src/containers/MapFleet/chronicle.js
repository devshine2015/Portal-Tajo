import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';

import ChroniclePath from './components/ChroniclePath';
import ChronicleMarker from './components/ChronicleMarker';
import MapGF from './components/MapGF';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { CHRONICLE_LOCAL_INCTANCE_STATE_VALID } from 'containers/Chronicle/actions';

import { createMapboxMap } from 'utils/mapBoxMap';


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

  createMapboxMap() {
    // if already existing
    if (this.theMap !== null) {
      return;
    }
    this.theMap = createMapboxMap(ReactDOM.findDOMNode(this));
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
        if (v.chronicleState !== CHRONICLE_LOCAL_INCTANCE_STATE_VALID
          || !v.chronicleFrame.isValid()) {
          return false;
        }
        return (
          <ChroniclePath
            key={v.id+'CrP'}
            theLayer={this.theMap}
            theVehicle={v}
            isSelected={this.props.selectedVehicle !== null && this.props.selectedVehicle.id === v.id}
          />
        );
      });
      chronMarkers = this.props.vehicles.map((v) => {
        if (v.chronicleState !== CHRONICLE_LOCAL_INCTANCE_STATE_VALID
          || !v.chronicleFrame.isValid()) {
          return false;
        }
        return (
        <ChronicleMarker
          key={v.id+'CrM'}
          theLayer={this.theMap}
          theVehicle={v}
          isSelected={this.props.selectedVehicle !== null && this.props.selectedVehicle.id === v.id}
        />
        );
      });
    }
    return (
      <div className = {styles.mapContainer}>
      {gfs}
      {chronPaths}
      {chronMarkers}
      }
      </div>
    );
  }
}

const PureMapChronicle = pure(MapChronicle);

MapChronicle.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
//  eventDispatcher: React.PropTypes.object.isRequired,
  vehicleById: React.PropTypes.func.isRequired,
  gfById: React.PropTypes.func.isRequired,
  gfEditMode: React.PropTypes.bool.isRequired,
  selectedVehicle: React.PropTypes.object,
};
const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
  vehicleById: fromFleetReducer.getVehicleByIdFunc(state),
  gfById: fromFleetReducer.getGFByIdFunc(state),
});
export default connect(mapState)(PureMapChronicle);
