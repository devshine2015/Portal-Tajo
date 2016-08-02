import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
require('mapbox.js'); // <-- auto-attaches to window.L
require('leaflet/dist/leaflet.css');


class MapVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.theMap = null;
    this.theMarker = null;
  }

  componentDidMount() {
    this.theMap = this.props.theMap;
    this.theMarker = window.L.marker(this.props.theVehicle.pos);
    this.theMarker.addTo(this.theMap);
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
  }

  render() {
    if (this.theMarker !== null) {
      this.setPosition(this.props.theVehicle.pos);
    }
    return false;
    // return (
    //   <div className = {styles.mapContainer}>
    //   </div>
    // );
  }
}

MapVehicle.propTypes = {
  theMap: React.PropTypes.object,
  theVehicle: React.PropTypes.object,
};
const PureMapVehicle = pure(MapVehicle);

export default PureMapVehicle;
