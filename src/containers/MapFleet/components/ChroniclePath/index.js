import React from 'react';
import pure from 'recompose/pure';

// import styles from './../styles.css';


class ChroniclePath extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = this.props.theLayer;
    this.createPath();
  }

  componentDidMount() {
  }
  componentWillUnmount() {
// TODO: need to delete MapBox markers?
    this.removePath();
  }
  createPath() {
    const latLngArray = [];
    const srcPosArray = this.props.chronicleFrame.posData;
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
        weight: 3,
        opacity: 0.85,
      });
//      this.thePath.bringToFront();
// zoom the map to the PATH
//      this.containerLayer.fitBounds(this.thePath.getBounds());
    } else {
      this.thePath.setStyle({
        color: '#0A5',
        weight: 2,
        opacity: 0.75,
      });
//    this.thePath.bringToBack();
    }
  }
  render() {
    this.highlight(this.props.isSelected);
    return false;
  }
}

ChroniclePath.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  chronicleFrame: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};
const PureChroniclePath = pure(ChroniclePath);

export default PureChroniclePath;
