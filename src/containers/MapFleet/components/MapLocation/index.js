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
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
  }

  render() {
    if (this.theMarker !== null) {
      this.setPosition(this.props.theLocation.pos);
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
