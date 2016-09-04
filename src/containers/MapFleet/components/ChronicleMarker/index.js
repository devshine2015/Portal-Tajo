import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { getNormalized100T } from 'containers/Chronicle/reducer';

// import styles from './../styles.css';


class ChronicleMarker extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = null;
    this.theMarker = null;
  }

  componentDidMount() {
    this.containerLayer = this.props.theLayer;
  }
  componentWillUnmount() {
// TODO: need to delete MapBox markers?
  }
  updateMarker() {
    if ( this.containerLayer === null
      || this.props.theVehicle === null
      || this.props.theVehicle.chronicleFrame === null) {
      return;
    }
    if (!this.props.theVehicle.chronicleFrame.isValid()) {
      return;
    }
    const startPos = this.props.theVehicle.chronicleFrame.posData[0].pos;
    if (this.theMarker === null) {
      this.theMarker = window.L.marker(startPos);
      const updater = (normalizedTime100, curPos, curSpeed, curTeperature) => {
        this.setPosition(curPos);
      };
      this.props.theVehicle.chronicleFrame.player.addUpdateCallback(updater);
    }
//    this.setPosition(startPos);
    if (!this.containerLayer.hasLayer(this.theMarker)) {
      this.containerLayer.addLayer(this.theMarker);
    }
    this.props.theVehicle.chronicleFrame.player.gotoTime100(this.props.normalized100T);
    // const updater = (normalizedTime100, curPos, curSpeed, curTeperature) => {
    //   this.setPosition(curPos);
    // };
    // this.props.theVehicle.chronicleFrame.player.addUpdateCallback(updater);
    // this.props.theVehicle.chronicleFrame.player.setPlaybackSpeed(1);
    // this.props.theVehicle.chronicleFrame.player.play(true);
//    getNormalized100T();
  }
  // updater(normalizedTime100, curPos, curSpeed, curTeperature) {
  //   this.setPosition(curPos);
  // }
  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
  }
  render() {
    this.updateMarker();
    return false;
  }
}

ChronicleMarker.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  theVehicle: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  normalized100T: React.PropTypes.number.isRequired,
};
const mapState = (state) => ({
  normalized100T: getNormalized100T(state),
});

const PureChronicleMarker = pure(ChronicleMarker);
export default connect(mapState)(PureChronicleMarker);
