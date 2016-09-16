import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';

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

require('leaflet.heat');

class HeatLayer extends React.Component {

  constructor(props) {
    super(props);
    this.theHeat = null;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // TODO: need to shutdown the mapbox object?
  }

  render() {
    return false;
  }
}

HeatLayer.propTypes = {
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
