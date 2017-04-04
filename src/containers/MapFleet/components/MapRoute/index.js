import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { hideLayer } from 'utils/mapBoxMap';
import directions from 'utils/mapServices/google/directions';
import { metersToDistanceLable, msToDurtationLable } from 'containers/Chronicle/utils/strings';
import { showSnackbar } from 'containers/Snackbar/actions';
import { AntPath } from 'leaflet-ant-path';

require('containers/MapFleet/leafletStyles.css');

class MapRoute extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = this.props.theLayer;
    this.thePath = null;
    this.toSpotMarker = null;
  }
  componentDidMount() {
  }
  shouldComponentUpdate(nextProps) {
    return this.props.routeToLatLng[0] !== nextProps.routeToLatLng[0];
  }
  componentWillUnmount() {
    hideLayer(this.containerLayer, this.thePath, true);
  }

  setPath = (latLngArray, durationMS, distanceM) => {
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
    const popUpSpot = this.props.routeToLatLng;

    this.thePath.bindPopup(`${msToDurtationLable(durationMS)}<br>${metersToDistanceLable(distanceM)}`,
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
      this.toSpotMarker = window.L.circleMarker(this.props.routeToLatLng,
        { opacity: 1,
          fillOpacity: 1,
          color: toMarkerColor,
          fillColor: toMarkerColor,
        })
        .setRadius(markerR);
      hideLayer(this.containerLayer, this.toSpotMarker, false);
    } else {
      this.toSpotMarker.setLatLng(this.props.routeToLatLng);
    }
  }

  noHaveRoute = () => {
    // `${this.props.translations.remove_fail} ✘`
    this.props.showSnackbar('Route not found :(', 5000);
    console.log(' route not found ');
  }

  directionsDo = () => {
    if (this.props.routeToLatLng.length !== 2) {
      return;
    }
    if (this.props.routeFromLatLng.length !== 2) {
      this.props.showSnackbar('Select vehicle first', 5000);
      return;
    }
    directions(this.props.routeFromLatLng, this.props.routeToLatLng, this.setPath, this.noHaveRoute);
  }

  render() {
    this.directionsDo();
    return false;
  }
}

MapRoute.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  routeToLatLng: React.PropTypes.array.isRequired,
  routeFromLatLng: React.PropTypes.array.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};
const mapState = () => ({
});
const mapDispatch = {
  showSnackbar,
};
const PureMapRoute = pure(MapRoute);
export default connect(mapState, mapDispatch)(PureMapRoute);

// export default PureChroniclePath;
