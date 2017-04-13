import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { setChronicleNormalizedT } from 'screens/Chronicle/actions';
import { hideLayer } from 'utils/mapBoxMap';


// import styles from './../styles.css';


class ChroniclePath extends React.Component {
  constructor(props) {
    super(props);
    this.thePath = null;
  }

  componentDidMount() {
    this.createPath();
    this.highlight(this.props.isSelected);
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

    hideLayer(this.props.theMap, this.thePath, false);
    this.thePath.bringToBack();
    this.props.theMap.invalidateSize();
// zoom the map to the PATH
    this.props.theMap.fitBounds(this.thePath.getBounds());
  }
  removePath() {
    if (this.thePath === null) {
      return;
    }
    hideLayer(this.props.theMap, this.thePath, true);
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
//      this.props.theMap.fitBounds(this.thePath.getBounds());
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
  theMap: React.PropTypes.object,
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

/*const makeChronoPath = (vehicle, vehCronicleFrame) => {
  if (!vehCronicleFrame.isValid() || !vehCronicleFrame.hasPositions()) {
    return false;
  }
  return (
        <ChroniclePath
          key={`${v.id}CrP`}
          theLayer={this.theMap}
          chronicleFrame={vehCronicleFrame}
          isSelected={this.props.selectedVehicle !== null
            && this.props.selectedVehicle.id === v.id}
        />
      );
};*/
