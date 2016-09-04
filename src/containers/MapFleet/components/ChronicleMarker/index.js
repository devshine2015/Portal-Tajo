import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { CHRONICLE_LOCAL_INCTANCE_STATE_VALID } from 'containers/Chronicle/actions';

import { getNormalized100T } from 'containers/Chronicle/reducer';

// import styles from './../styles.css';


class ChronicleMarker extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = props.theLayer;
    this.createMarkers();
  }

  componentDidMount() {
    // const updater = (normalizedTime100, curPos, curSpeed, curTeperature) => {
    //   this.setPosition(curPos);
    // };
    // this.props.theVehicle.chronicleFrame.player.addUpdateCallback(updater);
  }

  componentWillUnmount() {
// TODO: need to delete MapBox markers?
    this.removeMarker();
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.theMarkerSecondary.setLatLng(latLng);
  }

  createMarkers() {
    const markerR = 5;
    const startPos = window.L.latLng(0, 0);
    this.theMarkerSecondary = window.L.circleMarker(startPos,
      { title: this.props.theVehicle.name,
        opacity: 1,
        fillOpacity: 1,
        color: '#0A5',
        fillColor: '#008241',
       })
      .setRadius(markerR);
    this.theMarker = window.L.marker(startPos);
  }

  update() {
    this.props.theVehicle.chronicleFrame.player.gotoTime100(this.props.normalized100T);
    const curData = this.props.theVehicle.chronicleFrame.player.getCurrent();
    this.setPosition(curData.pos);
  }

  removeMarker() {
    if (this.containerLayer === null) {
      return;
    }
    if (this.containerLayer.hasLayer(this.theMarker)) {
      this.containerLayer.removeLayer(this.theMarker);
    }
    if (this.containerLayer.hasLayer(this.theMarkerSecondary)) {
      this.containerLayer.removeLayer(this.theMarkerSecondary);
    }
  }

  hichlight(doHighlight) {
    if (this.containerLayer === null) {
      return;
    }
    if (doHighlight) {
      if (!this.containerLayer.hasLayer(this.theMarker)) {
        this.containerLayer.addLayer(this.theMarker);
        //
        // pan to me when selected
        const bounds = this.containerLayer.getBounds();
        if (!bounds.contains(this.theMarker.getLatLng())) {
          this.containerLayer.panTo(this.theMarker.getLatLng());
        }
      }
      if (this.containerLayer.hasLayer(this.theMarkerSecondary)) {
        this.containerLayer.removeLayer(this.theMarkerSecondary);
      }
    } else {
      if (this.containerLayer.hasLayer(this.theMarker)) {
        this.containerLayer.removeLayer(this.theMarker);
      }
      if (!this.containerLayer.hasLayer(this.theMarkerSecondary)) {
        this.containerLayer.addLayer(this.theMarkerSecondary);
      }
    }
  }


  render() {
    this.update();
    this.hichlight(this.props.isSelected);
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
