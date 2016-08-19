import React from 'react';
import pure from 'recompose/pure';
// import styles from './styles.css';
// require('mapbox.js'); // <-- auto-attaches to window.L
// require('leaflet/dist/leaflet.css');
// const icon = require('./images/markers/truckIconIdle.png');
// const icon = require('components/icons/minibus_pin.svg');
const icon = require('assets/images/v_icons/minibus.png');
const iconSelected = require('./images/markers/truckIcon.png');

class MapVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.theLayer = null;
    this.theMarker = null;
    this.markerIcon = null;
    this.markerIconSelected = null;
    this.popUp = null;
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
      || this.props.theVehicle.filteredOut !== nextProps.theVehicle.filteredOut
      || this.props.isSelected !== nextProps.isSelected;
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
  }
  createMarker() {
    const iconH = 240 / 2;
    const iconW = 80 / 2;
    const iconSz = 32;
    this.markerIcon = window.L.icon({
      iconUrl: icon,
      iconSize: [iconW, iconH],
      iconAnchor: [iconW / 2, iconH / 2],
    });
    this.markerIconSelected = window.L.icon({
      iconUrl: iconSelected,
      iconSize: [iconW, iconH],
      iconAnchor: [iconW / 2, iconH / 2],
    });
    this.theMarker = window.L.marker(this.props.theVehicle.pos,
      { title: this.props.theVehicle.name,
        icon: this.markerIcon,
        riseOnHover: true,
      });
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
    }).setContent(this.props.theVehicle.name);
    // this.theMarker.bindPopup(this.popUp);
    // const hoverHandle = ((inThis) => (e) => {
    //   inThis.theMarker.openPopup();
    // })(this);
    // this.theMarker.on('mouseover', hoverHandle);
    // // this.theMarker.on('mouseout', (e) => {
    // // });
  }
  toggle(doShow) {
    if (doShow) {
      if (!this.theLayer.hasLayer(this.theMarker)) {
        this.theLayer.addLayer(this.theMarker);
      }
    } else {
      if (this.theLayer.hasLayer(this.theMarker)) {
        this.theLayer.removeLayer(this.theMarker);
      }
    }
  }
  expand(doExpand) {
    if (doExpand) {
      this.theMarker.setIcon(this.markerIconSelected).setZIndexOffset(200);
    } else {
      this.theMarker.setIcon(this.markerIcon).setZIndexOffset(0);
    }
  }

  render() {
    if (this.theMarker !== null) {
      this.setPosition(this.props.theVehicle.pos);
      this.toggle(!this.props.theVehicle.filteredOut);
      this.expand(this.props.isSelected);
    }
    return false;
  }
}

MapVehicle.propTypes = {
  theLayer: React.PropTypes.object,
  theVehicle: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};
const PureMapVehicle = pure(MapVehicle);

export default PureMapVehicle;
