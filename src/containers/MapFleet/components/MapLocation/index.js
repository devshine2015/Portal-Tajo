import React from 'react';
import pure from 'recompose/pure';
// import styles from './styles.css';
// require('mapbox.js'); // <-- auto-attaches to window.L
// require('leaflet/dist/leaflet.css');


class MapLocation extends React.Component {
  constructor(props) {
    super(props);
    this.theMap = null;
    this.theMarker = null;
    this.theCircle = null;
  }

  componentDidMount() {
    this.theMap = this.props.theMap;
    this.theMarker = window.L.circleMarker(this.props.theLocation.pos,
      { title: this.props.theLocation.name });
    const clickHandle = ((inThis) => (e) => {
      inThis.props.onClick(inThis.props.theLocation.id);
//      console.log('MARKER clicked ' + inThis.props.theVehicle.id);
    })(this);
    this.theMarker.on('click', clickHandle);
    this.theMarker.addTo(this.theMap);

    this.theCircle = window.L.circle(this.props.theLocation.pos, this.props.theLocation.radius);
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.theCircle.setLatLng(latLng);
  }
  expand(doExpand) {
    if (doExpand) {
      this.theMap.addLayer(this.theCircle);
    } else {
      if (this.theMap.hasLayer(this.theCircle)) {
        this.theMap.removeLayer(this.theCircle);
      }
    }
  }
  toggle(doShow) {
    if (doShow) {
      if (!this.theMap.hasLayer(this.theMarker)) {
        this.theMap.addLayer(this.theMarker);
      }
    } else {
      if (this.theMap.hasLayer(this.theMarker)) {
        this.theMap.removeLayer(this.theMarker);
      }
      this.expand(false);
    }
  }

  render() {
    if (this.theMarker !== null) {
      this.toggle(!this.props.theLocation.filteredOut);
      this.setPosition(this.props.theLocation.pos);
      this.expand(this.props.isSelected);
    }
    return false;
  }
}

MapLocation.propTypes = {
  theMap: React.PropTypes.object,
  theLocation: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};
const PureMapLocation = pure(MapLocation);

export default PureMapLocation;
