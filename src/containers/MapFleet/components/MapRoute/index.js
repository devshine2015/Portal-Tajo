import React from 'react';
import pure from 'recompose/pure';
import { hideLayer } from 'utils/mapBoxMap';
import { metersToDistanceLable, msToDurtationLable } from 'containers/Chronicle/utils/strings';
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
  // shouldComponentUpdate(nextProps) {
  //   return this.props.routeToLatLng[0] !== nextProps.routeToLatLng[0];
  // }
  componentWillUnmount() {
    hideLayer(this.containerLayer, this.thePath, true);
  }

  setPath = () => {
    if (this.props.routeObj === null
      || this.props.routeObj.path === undefined) {
      return;
    }
    this.updateToMarker();

    if (this.thePath === null) {
      this.createPath(this.props.routeObj.pathLatLngs);
    } else {
      this.thePath.setLatLngs(this.props.routeObj.pathLatLngs));
    }
    hideLayer(this.containerLayer, this.thePath, false);

    // find the top point to set popup to
    // let popUpSpot = latLngArray[0];
    // latLngArray.forEach(latLng => {if (latLng.lat > popUpSpot.lat) popUpSpot = latLng;});
    const popUpSpot = this.props.routeObj.destination;

    this.thePath.bindPopup(`${msToDurtationLable(this.props.routeObj.durationMS)}
        <br>${metersToDistanceLable(this.props.routeObj.distanceM)}`,
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
      this.toSpotMarker = window.L.circleMarker(this.props.routeObj.destination,
        { opacity: 1,
          fillOpacity: 1,
          color: toMarkerColor,
          fillColor: toMarkerColor,
        })
        .setRadius(markerR);
      hideLayer(this.containerLayer, this.toSpotMarker, false);
    } else {
      this.toSpotMarker.setLatLng(this.props.routeObj.destination);
    }
  }

  render() {
    this.setPath();
    return false;
  }
}

MapRoute.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  routeObj: React.PropTypes.object.isRequired,
};

export default pure(MapRoute);

// export default PureChroniclePath;
