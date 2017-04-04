import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import { ctxGetNearestRefLatLng } from 'services/Global/reducers/contextReducer';
import { hideLayer } from 'utils/mapBoxMap';
import distanceMatrix from 'utils/mapServices/google/distanceMatrix';
import { metersToDistanceLable, msToDurtationLable } from 'containers/Chronicle/utils/strings';
import { showSnackbar } from 'containers/Snackbar/actions';
import { AntPath } from 'leaflet-ant-path';

require('containers/MapFleet/leafletStyles.css');
// import styles from './../styles.css';


class MapNearest extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = this.props.theLayer;
    this.thePath = null;
    this.toSpotMarker = null;
    this.cachedVehicles = []; // keep all the vehicelse we requiested distMatrix for
    this.state = {
      fromLatLng: [],
    };
  }
  componentDidMount() {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.nearestRefLatLng[0] !== nextProps.nearestRefLatLng[0];
  }
  componentWillUnmount() {
    hideLayer(this.containerLayer, this.thePath, true);
  }

  processMatrix = (resultsArray) => {
    let bestIdx = 0;
    resultsArray.forEach((aRes, idx) => {if (resultsArray[bestIdx].distanceM > aRes.distanceM) bestIdx = idx; });

// console.log(resultsArray);
// console.log(`  >>>>  ${bestIdx}`);
    this.props.selectVehicle(this.cachedVehicles[bestIdx].id);
    // this.props.setSelectedVehicleId(this.cachedVehicles[bestIdx].id);

    this.setState({ fromLatLng: this.cachedVehicles[bestIdx].pos, toLatLng: this.props.nearestRefLatLng });

    this.updateToMarker();
    this.toSpotMarker.bindPopup(`${msToDurtationLable(resultsArray[bestIdx].durationMS)}
        <br>${metersToDistanceLable(resultsArray[bestIdx].distanceM)}`,
      {
        closeButton: false,
        closeOnClick: false,
        autoPan: false,
        keepInView: false,
        zoomAnimation: true,
      })
      .openPopup();
  }

  updateToMarker = () => {
    if (this.toSpotMarker === null) {
      const toMarkerColor = '#2969c3'; // '#3388ff';
      const markerR = 4;
      this.toSpotMarker = window.L.circleMarker(this.props.nearestRefLatLng,
        { opacity: 1,
          fillOpacity: 1,
          color: toMarkerColor,
          fillColor: toMarkerColor,
        })
        .setRadius(markerR);
      hideLayer(this.containerLayer, this.toSpotMarker, false);
    } else {
      this.toSpotMarker.setLatLng(this.props.nearestRefLatLng);
    }
  }

  noHaveCallback = () => {
    // `${this.props.translations.remove_fail} ✘`
    this.props.showSnackbar('Route not found :(', 5000);
    console.log(' route not found ');
  }

  findNearestDo = () => {
    if (this.props.nearestRefLatLng.length !== 2) {
      return;
    }
    this.cachedVehicles = [];

    const originsLatLng = this.props.vehicles
        .filter(aVehicle => !aVehicle.filteredOut)
        .map(aVehicle => {this.cachedVehicles.push(aVehicle); return aVehicle.pos;});

    distanceMatrix(originsLatLng, [this.props.nearestRefLatLng], this.processMatrix, this.noHaveCallback);
  }

  render() {
    this.findNearestDo();
    return false;
    /*return (
      <MapRoute refVehicle={selectedVehicle} isSelected
          theLayer={this.props.theLayer} getRouteToLatLng={this.props.getRouteToLatLng} />
    )*/
  }
}

MapNearest.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  nearestRefLatLng: React.PropTypes.array.isRequired,
  vehicles: React.PropTypes.array.isRequired,
  // refVehicle: React.PropTypes.obj,
  showSnackbar: React.PropTypes.func.isRequired,
  setSelectedVehicleId: React.PropTypes.func.isRequired,
  selectVehicle: React.PropTypes.func.isRequired,
};
const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  nearestRefLatLng: ctxGetNearestRefLatLng(state),
});
const mapDispatch = {
  showSnackbar,
  setSelectedVehicleId: vehiclesActions.setSelectedVehicleId,
};
const PureMapNearest = pure(MapNearest);
export default connect(mapState, mapDispatch)(PureMapNearest);

// export default PureChroniclePath;
