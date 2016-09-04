import React from 'react';
import pure from 'recompose/pure';
// import styles from './../styles.css';


class ChroniclePath extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = null;
    this.thePath = null;
  }

  componentDidMount() {
    this.containerLayer = this.props.theLayer;
  }
  componentWillUnmount() {
// TODO: need to delete MapBox markers?
  }
  updatePath() {
    if ( this.containerLayer === null
      || this.props.theVehicle === null
      || this.props.theVehicle.chronicleFrame === null
      || this.props.theVehicle.chronicleFrame.hasMapPath) {
      return;
    }
    this.removePath();
    if (!this.props.theVehicle.chronicleFrame.isValid()) {
      return;
    }
    this.props.theVehicle.chronicleFrame.hasMapPath = true;
    const latLngArray = [];
    const srcPosArray = this.props.theVehicle.chronicleFrame.posData;
    for (let i = 0; i < srcPosArray.length; ++i) {
      latLngArray.push(srcPosArray[i].pos);
    }

    this.thePath = window.L.polyline(latLngArray);

    if (!this.containerLayer.hasLayer(this.thePath)) {
      this.containerLayer.addLayer(this.thePath);
    }
    this.thePath.bringToBack();
    this.containerLayer.invalidateSize();
// zoom the map to the PATH
    this.containerLayer.fitBounds(this.thePath.getBounds());
  }
  removePath() {
    if (this.thePath === null) {
      return;
    }
    if (this.containerLayer.hasLayer(this.thePath)) {
      this.containerLayer.removeLayer(this.thePath);
    }
    this.thePath = null;
  }
  highlight(doHighlight) {
    if (this.thePath === null) {
      return;
    }
// TODO: colors from theme
    if (doHighlight) {
      this.thePath.setStyle({
        color: '#e64a19',
        weight: 4,
        opacity: 0.85,
      });
//      this.thePath.bringToFront();
    } else {
      this.thePath.setStyle({
        color: '#0A5',
        weight: 4,
        opacity: 0.75,
      });
//    this.thePath.bringToBack();
    }
  }
  render() {
    this.updatePath();
    this.highlight(this.props.isSelected);
    return false;
  }
}

ChroniclePath.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  theVehicle: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};
const PureChroniclePath = pure(ChroniclePath);

export default PureChroniclePath;
