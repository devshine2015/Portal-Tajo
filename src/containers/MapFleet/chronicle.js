import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';

import ChroniclePath from './components/ChroniclePath';
import MapGF from './components/MapGF';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import createMap from 'utils/mapBoxMap';


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
    this.theMap = createMap(ReactDOM.findDOMNode(this));
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

    if (this.theMap !== null) {
      gfs = this.props.gfs.map((v) => (
        <MapGF
          key={v.id}
          isSelected={false}
          isDetailViewActivated={false}
          theLayer={this.gfMarkersLayer}
          theGF={v}
          onClick={ () => {} }
        />
      ));
    }
    return (
      <div className = {styles.mapContainer}>
      {gfs}
      {this.theMap === null ? false :
        <ChroniclePath
          theLayer={this.theMap}
          selectedVehicle={this.props.selectedVehicle}
        />
      }
      </div>
    );
  }
}

const PureMapChronicle = pure(MapChronicle);

MapChronicle.propTypes = {
  gfs: React.PropTypes.array.isRequired,
  eventDispatcher: React.PropTypes.object.isRequired,
  vehicleById: React.PropTypes.func.isRequired,
  gfById: React.PropTypes.func.isRequired,
  gfEditMode: React.PropTypes.bool.isRequired,
  selectedVehicle: React.PropTypes.object.isRequired,
};
const mapState = (state) => ({
  gfs: fromFleetReducer.getGFsExSorted(state),
  vehicleById: fromFleetReducer.getVehicleByIdFunc(state),
  gfById: fromFleetReducer.getGFByIdFunc(state),
});
export default connect(mapState)(PureMapChronicle);
