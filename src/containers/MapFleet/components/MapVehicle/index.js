import React from 'react';
import pure from 'recompose/pure';
import { getVehicleByValue } from 'services/FleetModel/utils/vehiclesMap';
import { hideLayer, latLngMoveTo } from 'utils/mapBoxMap';
import styles from './../styles.css';
import { createPointerLine, showPointerLine } from './../../utils/pointerLineHelpers';
import { isMaritime } from 'configs';
// const iconPin = require('assets/images/v_icons_combi/pin.png');
const iconPin = require('assets/images/v_icons_combi/pointer.png');
// const iconPin = require('assets/images/v_icons_combi/pointerRightTilt.png');

class MapVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.theLayer = null;
    this.theMarker = null;
    this.markerIcon = null;
    this.markerIconSelected = null;
    this.popUp = null;
    this.pointerLine = null;
    this.theDirectionLine = null;
  }

  componentDidMount() {
    this.theLayer = this.props.theLayer;
    this.createMarker();
    this.setPosition(this.props.theVehicle.pos);
    this.toggle(!this.props.theVehicle.filteredOut);
    this.expand(this.props.isSelected);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.theVehicle.pos !== nextProps.theVehicle.pos
      || this.props.theVehicle.estimatedTravelKm !== nextProps.theVehicle.estimatedTravelKm
      || this.props.theVehicle.filteredOut !== nextProps.theVehicle.filteredOut
      || this.props.isSelected !== nextProps.isSelected
      || (this.props.isSelected
          && this.props.isDetailViewActivated !== nextProps.isDetailViewActivated);
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.pointerLine.setLatLng(latLng);
    if (this.theMoveCircle !== null) {
      this.theMoveCircle.setLatLng(latLng);
    }
  }
  createMarker() {
    // const iconH = 240 / 2;
    // const iconW = 80 / 2;
    // const iconSz = 32;

    const iScale = 0.25;
    const headSz = 152 * iScale;
    const pinW = 56 * iScale;
    const pinH = 119 * iScale;
    const pinAnchorW = pinW / 2;
    const pinAnchorH = 95 * iScale;
    const headAnchorW = headSz / 2;
    const headAnchorH = headSz + pinAnchorH * 0.75;
    // const pinW = 112 * iScale;
    // const pinH = 119 * iScale;
    // const pinAnchorW = 38 * iScale;
    // const pinAnchorH = 95 * iScale;
    // const headAnchorW = pinW - headSz * 0.75;
    // const headAnchorH = headSz + pinAnchorH * 0.65;

    const iconImg = getVehicleByValue(this.props.theVehicle.original.kind).pic;

    this.markerIcon = window.L.icon({
      iconUrl: iconImg,
      iconSize: [headSz, headSz],
      iconAnchor: [headSz / 2, headSz / 2],
    });
    this.markerIconSelected = window.L.icon({
      iconUrl: iconImg,
      iconSize: [headSz, headSz],
      iconAnchor: [headAnchorW, headAnchorH],
      shadowUrl: iconPin,
      shadowSize: [pinW, pinH],
      shadowAnchor: [pinAnchorW, pinAnchorH],
      className: styles.animatedS,
    });
    this.theMarker = window.L.marker(this.props.theVehicle.pos,
      { title: this.props.theVehicle.original.name,
        icon: this.markerIcon,
        riseOnHover: true,
      });
    this.theMoveCircle = isMaritime ? window.L.circle(this.props.theVehicle.pos,
      10,
      { opacity: 1,
        fillOpacity: 0.3,
        color: '#1f757d',
        fillColor: '#1f757d',
        dashArray: '5, 5',
        weight: 1,
       })
       : null;
    this.theDirectionLine = isMaritime ? window.L.polyline([this.props.theVehicle.pos,
          this.props.theVehicle.pos],
       { opacity: 1,
         color: '#1f757d',
         dashArray: '5, 5',
         weight: 1,
        })
        : null;

    const clickHandle = ((inThis) => (e) => {
      inThis.props.onClick(inThis.props.theVehicle.id);
//      console.log('MARKER clicked ' + inThis.props.theVehicle.id);
    })(this);
    this.theMarker.on('click', clickHandle);
    this.popUp = window.L.popup({
//        offset: [0, -this.iconSize*1.85],
//          className: 'ddsMapPopUp',
//        minWidth: 150,
      closeButton: false,
      closeOnClick: true,
      autoPan: false,
      keepInView: false,
      zoomAnimation: true,
    }).setContent(this.props.theVehicle.original.name);

    // this.theMarker.bindPopup(this.popUp);
    // const hoverHandle = ((inThis) => (e) => {
    //   inThis.theMarker.openPopup();
    // })(this);
    // this.theMarker.on('mouseover', hoverHandle);
    // // this.theMarker.on('mouseout', (e) => {
    // // });
    this.pointerLine = createPointerLine(this.props.theVehicle.pos,
      [headAnchorW, headAnchorH - headSz / 2]);
    this.theLayer.addLayer(this.pointerLine);
    showPointerLine(this.pointerLine, false);
  }
  toggle(doShow) {
    hideLayer(this.theLayer, this.theMarker, !doShow);
  }
  expand(doExpand) {
    if (doExpand) {
      this.theMarker.setIcon(this.markerIconSelected).setZIndexOffset(20000);
      if (this.theMoveCircle !== null) {
        const radius = this.props.theVehicle.estimatedTravelKm * 1000;
        // no display estimated move circle if distance is too small
        if (radius < 25) {
          return;
        }
        hideLayer(this.theLayer, this.theMoveCircle, false);
        this.theMoveCircle.setRadius(this.props.theVehicle.estimatedTravelKm * 1000);
        hideLayer(this.theLayer, this.theDirectionLine, false);
        this.theDirectionLine.setLatLngs([this.props.theVehicle.pos,
          latLngMoveTo(window.L.latLng(this.props.theVehicle.pos),
            this.props.theVehicle.heading,
            this.props.theVehicle.estimatedTravelKm)]);
      }
    } else {
      this.theMarker.setIcon(this.markerIcon).setZIndexOffset(0);
      hideLayer(this.theLayer, this.theMoveCircle, true);
      hideLayer(this.theLayer, this.theDirectionLine, true);
    }
  }

  render() {
    if (this.theMarker !== null) {
      this.setPosition(this.props.theVehicle.pos);
      this.toggle(!this.props.theVehicle.filteredOut);
      this.expand(this.props.isSelected);
      showPointerLine(this.pointerLine, !this.props.theVehicle.filteredOut
                                        && this.props.isSelected
                                        && this.props.isDetailViewActivated);
    }
    return false;
  }
}

MapVehicle.propTypes = {
  theLayer: React.PropTypes.object,
  theVehicle: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  isDetailViewActivated: React.PropTypes.bool.isRequired,
};
const PureMapVehicle = pure(MapVehicle);

export default PureMapVehicle;
