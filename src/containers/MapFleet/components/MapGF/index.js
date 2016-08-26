import React from 'react';
import pure from 'recompose/pure';

class MapGF extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = null;
    this.theMarker = null;
    this.theCircle = null;
  }

  componentDidMount() {
    this.containerLayer = this.props.theLayer;
    this.theMarker = window.L.circleMarker(this.props.theGF.pos,
      { title: this.props.theGF.name });
    const clickHandle = ((inThis) => (e) => {
      inThis.props.onClick(inThis.props.theGF.id);
//      console.log('MARKER clicked ' + inThis.props.theVehicle.id);
    })(this);
    this.theMarker.on('click', clickHandle).addTo(this.containerLayer);

    this.theCircle = window.L.circle(this.props.theGF.pos, this.props.theGF.radius).setStyle(
      { color: this.context.muiTheme.palette.PLItemBackgroundColorExpanded });

//    this.theCircle.editing.enable();
  }
  componentWillUnmount() {
    this.toggle(false);
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.theCircle.setLatLng(latLng);
  }
  expand(doExpand) {
    if (doExpand) {
      this.theMarker.setStyle(
        { color: this.context.muiTheme.palette.PLItemBackgroundColorExpanded });
      this.containerLayer.addLayer(this.theCircle);
    } else {
      this.theMarker.setStyle({ color: '#03f' });
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
      this.toggle(!this.props.theGF.filteredOut);
      this.setPosition(this.props.theGF.pos);
      this.expand(this.props.isSelected);
    }
    return false;
  }
}


MapGF.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
MapGF.propTypes = {
  theLayer: React.PropTypes.object,
  theGF: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};
const PureMapGF = pure(MapGF);

export default PureMapGF;
