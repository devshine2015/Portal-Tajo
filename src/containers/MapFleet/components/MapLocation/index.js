import React from 'react';
import pure from 'recompose/pure';

class MapLocation extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = null;
    this.theMarker = null;
    this.theCircle = null;
  }

  componentDidMount() {
    this.containerLayer = this.props.theLayer;
    this.theMarker = window.L.circleMarker(this.props.theLocation.pos,
      { title: this.props.theLocation.name });
    const clickHandle = ((inThis) => (e) => {
      inThis.props.onClick(inThis.props.theLocation.id);
//      console.log('MARKER clicked ' + inThis.props.theVehicle.id);
    })(this);
    this.theMarker.on('click', clickHandle);
    this.theMarker.addTo(this.containerLayer);

    this.theCircle = window.L.circle(this.props.theLocation.pos, this.props.theLocation.radius);
//    this.theCircle.editing.enable();
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.theCircle.setLatLng(latLng);
  }
  expand(doExpand) {
    if (doExpand) {
      this.containerLayer.addLayer(this.theCircle);
    } else {
      if (this.containerLayer.hasLayer(this.theCircle)) {
        this.containerLayer.removeLayer(this.theCircle);
      }
    }
  }
  toggle(doShow) {
    if (doShow) {
      if (!this.containerLayer.hasLayer(this.theMarker)) {
        this.containerLayer.addLayer(this.theMarker);
      }
    } else {
      if (this.containerLayer.hasLayer(this.theMarker)) {
        this.containerLayer.removeLayer(this.theMarker);
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
  theLayer: React.PropTypes.object,
  theLocation: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};
const PureMapLocation = pure(MapLocation);

export default PureMapLocation;
