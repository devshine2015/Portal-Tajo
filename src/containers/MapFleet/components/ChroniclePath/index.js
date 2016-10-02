import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { setChronicleNormalizedT } from 'containers/Chronicle/actions';


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
    const that = this;
    this.thePath = window.L.polyline(latLngArray);
    this.thePath.on('click', (e) => {
      const clickT100 = that.props.chronicleFrame.player.findNormilized100TForPos(e.latlng);
      console.log('click on '+clickT100.toFixed(1));
      that.props.setChronicleNormalizedT(clickT100);
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
      this.thePath.bringToFront();
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
  setChronicleNormalizedT: React.PropTypes.func.isRequired,
};
const mapState = () => ({
});
const mapDispatch = {
  setChronicleNormalizedT,
};
const PureChroniclePath = pure(ChroniclePath);
export default connect(mapState, mapDispatch)(PureChroniclePath);

// export default PureChroniclePath;
