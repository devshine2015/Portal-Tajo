import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { hideLayer } from 'utils/mapBoxMap';
import { metersToDistanceLable, msToDurtationLable } from 'screens/Chronicle/utils/strings';
import { AntPath } from 'leaflet-ant-path';
import { mapStoreGetRoute } from 'containers/Map/reducerAction';

require('containers/Map/leafletStyles.css');

class MapRoute extends React.Component {
  constructor(props) {
    super(props);
    this.thePath = null;
    this.toSpotMarker = null;
  }

  componentWillUnmount() {
    hideLayer(this.props.theMap, this.thePath, true);
  }

  setPath = () => {
    if (this.props.routeObj === null
      || this.props.routeObj.pathLatLngs === undefined) {
      return;
    }
    this.updateToMarker();

    if (this.thePath === null) {
      this.createPath(this.props.routeObj.pathLatLngs);
    } else {
      this.thePath.setLatLngs(this.props.routeObj.pathLatLngs);
    }
    hideLayer(this.props.theMap, this.thePath, false);

    // find the top point to set popup to
    // let popUpSpot = latLngArray[0];
    // latLngArray.forEach(latLng => {if (latLng.lat > popUpSpot.lat) popUpSpot = latLng;});
    const popUpSpot = this.props.routeObj.destination;
    // const content = window.L.DomUtil.create('div', `${msToDurtationLable(this.props.routeObj.durationMS)}
    //     <br>${metersToDistanceLable(this.props.routeObj.distanceM)}`);
    // window.L.DomEvent.addListener(content, 'click', () => {console.log('me ===>>> clicked ');});
    const popUp = window.L.popup({
      closeButton: false,
      closeOnClick: false,
      autoPan: false,
      keepInView: false,
      zoomAnimation: true,
    })
      // .setContent(`${msToDurtationLable(this.props.routeObj.durationMS)}
      //   <br>${metersToDistanceLable(this.props.routeObj.distanceM)}`);
      // .setContent(content);
      .setContent(`<div>${msToDurtationLable(this.props.routeObj.durationMS)}
        <br>${metersToDistanceLable(this.props.routeObj.distanceM)}</div>`);
//    popUp.on('click', () => {console.log('me ===>>> clicked ');});
    // popUp._contentNode.on('click', () => {console.log('me ===>>> clicked ');});
    // window.L.DomEvent.on(popUp._contentNode, 'click', () => {console.log('me ===>>> clicked ');});
    this.thePath.bindPopup(popUp)
      .openPopup(popUpSpot);

    // this.thePath.bindPopup(`${msToDurtationLable(this.props.routeObj.durationMS)}
    //     <br>${metersToDistanceLable(this.props.routeObj.distanceM)}`,
    //   {
    //     closeButton: true,
    //     closeOnClick: false,
    //     autoPan: false,
    //     keepInView: false,
    //     zoomAnimation: true,
    //   })
    //   .openPopup(popUpSpot);
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
      hideLayer(this.props.theMap, this.toSpotMarker, false);
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
  theMap: PropTypes.object.isRequired,
  routeObj: PropTypes.object,
};

MapRoute.defaultProps = {
  routeObj: null,
};

const mapState = (state) => ({
  routeObj: mapStoreGetRoute(state),
});

export default connect(mapState)(pure(MapRoute));
