import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { ctxGetRouteToLatLng } from 'services/Global/reducers/contextReducer';
import { hideLayer } from 'utils/mapBoxMap';
import directions from 'utils/mapServices/google/directions';
import { metersToDistanceLable, msToDurtationLable } from 'containers/Chronicle/utils/strings';
import { showSnackbar } from 'containers/Snackbar/actions';
import { AntPath } from 'leaflet-ant-path';

require('containers/MapFleet/leafletStyles.css');
// import styles from './../styles.css';


class MapRoute extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = this.props.theLayer;
    this.thePath = null;
    this.toSpotMarker = null;
    this.state = {
      fromLatLng: [],
      toLatLng: [],
    };
  }
  componentDidMount() {
  }
  shouldComponentUpdate(nextProps) {
    return this.props.getRouteToLatLng[0] !== nextProps.getRouteToLatLng[0];
  }
  componentWillUnmount() {
    hideLayer(this.containerLayer, this.thePath, true);
  }

  setPath = (latLngArray, durationMS, distnaceM) => {
    this.updateToMarker();

    if (this.thePath === null) {
      this.createPath(latLngArray);
    } else {
      this.thePath.setLatLngs(latLngArray);
    }
    hideLayer(this.containerLayer, this.thePath, false);

    // find the top point to set popup to
    // let popUpSpot = latLngArray[0];
    // latLngArray.forEach(latLng => {if (latLng.lat > popUpSpot.lat) popUpSpot = latLng;});
    const popUpSpot = this.props.getRouteToLatLng;

    this.thePath.bindPopup(`${msToDurtationLable(durationMS)}<br>${metersToDistanceLable(distnaceM)}`,
      {
        closeButton: false,
        closeOnClick: false,
        autoPan: false,
        keepInView: false,
        zoomAnimation: true,
      })
      .openPopup(popUpSpot);
  }

  createPath = (latLngArray) => {
//      #3388ff
    this.thePath = new AntPath(latLngArray, {
        // color: '#2969c3',
        // color: '#3388ff',
      color: '',
      weight: 5,
      dashArray: '1,11',
        // paused: true,
        // pulseColor: '#3388ff',
      pulseColor: '#2969c3',
        // pulseOpacity: 0.5,
      opacity: 1,
    });
    // this.thePath = window.L.polyline(latLngArray);
  }

  updateToMarker = () => {
    if (this.toSpotMarker === null) {
      const toMarkerColor = '#2969c3'; // '#3388ff';
      const markerR = 4;
      this.toSpotMarker = window.L.circleMarker(this.props.getRouteToLatLng,
        { opacity: 1,
          fillOpacity: 1,
          color: toMarkerColor,
          fillColor: toMarkerColor,
        })
        .setRadius(markerR);
      hideLayer(this.containerLayer, this.toSpotMarker, false);
    } else {
      this.toSpotMarker.setLatLng(this.props.getRouteToLatLng);
    }
  }

  noHaveRoute = () => {
    // `${this.props.translations.remove_fail} ✘`
    this.props.showSnackbar('Route not found :(', 5000);
    console.log(' route not found ');
  }

  directionsDo = () => {
    if (this.props.getRouteToLatLng.length !== 2) {
      return;
    }
    if (this.props.refVehicle === undefined) {
      this.props.showSnackbar('Select vehicle first', 5000);
      return;
    }
    directions(this.props.refVehicle.pos, this.props.getRouteToLatLng, this.setPath, this.noHaveRoute);
  }

  render() {
    this.directionsDo();
    return false;
  }
}

MapRoute.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  getRouteToLatLng: React.PropTypes.array.isRequired,
  refVehicle: React.PropTypes.obj,
  showSnackbar: React.PropTypes.func.isRequired,
};
const mapState = (state) => ({
  getRouteToLatLng: ctxGetRouteToLatLng(state),
});
const mapDispatch = {
  showSnackbar,
};
const PureMapRoute = pure(MapRoute);
export default connect(mapState, mapDispatch)(PureMapRoute);

// export default PureChroniclePath;
