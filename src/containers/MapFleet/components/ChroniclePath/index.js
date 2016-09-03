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
    this.removePath();
    if (this.props.selectedVehicle === null
      || this.props.selectedVehicle.chronicleFrame === null) {
      return;
    }
    const latLngArray = [];
    const srcPosArray =  this.props.selectedVehicle.chronicleFrame.posData;
    for (let i = 0; i < srcPosArray.length; ++i) {
      latLngArray.push(srcPosArray[i].pos);
    }

    this.thePath = window.L.polyline(latLngArray, {
      color: '#0A5',
      weight: 4,
      opacity: 0.75,
    //      dashArray: '5, 15'
    });

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
    if (!this.containerLayer.hasLayer(this.thePath)) {
      this.containerLayer.addLayer(this.thePath);
    }
    this.thePath = null;
  }
  render() {
    this.updatePath();
    return false;
  }
}

ChroniclePath.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  selectedVehicle: React.PropTypes.object.isRequired,
};
const PureChroniclePath = pure(ChroniclePath);

export default PureChroniclePath;
