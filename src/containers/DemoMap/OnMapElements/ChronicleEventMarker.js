import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';
import { hideLayer } from 'utils/mapBoxMap';
import { dateToChronicleLable, msToDurtationLable } from 'screens/DemoChronicle/utils/strings';

class ChronicleMarker extends React.Component {
  constructor(props) {
    super(props);
    this.theMarker = null;
  }

  componentWillMount() {
    this.setUp();
  }

  componentWillUnmount() {
// TODO: need to delete MapBox markers?
    this.removeMarker();
  }

  setUp() {
    if (this.theMarker !== null) {
      return;
    }
    this.theMarker = window.L.marker(this.props.chronicleEvent.pos);
    const popUp = window.L.popup({
      offset: [0, 0],
//              className: 'ddsMapHistorySecondaryPopup',
      closeButton: false,
      closeOnClick: false,
      autoPan: false,
      keepInView: false,
      zoomAnimation: true,
    })
    .setContent(`${dateToChronicleLable(this.props.chronicleEvent.date)
    }<br>${
    msToDurtationLable(this.props.chronicleEvent.period)}`)
    .setLatLng((this.props.chronicleEvent.pos));

    this.theMarker.bindPopup(popUp);

    hideLayer(this.props.theMap, this.theMarker, false);
  }

  removeMarker() {
    if (this.props.theMap === null) {
      return;
    }
    hideLayer(this.props.theMap, this.theMarker, true);
  }

  render() {
    // this.setUp();
    return false;
  }
}

ChronicleMarker.propTypes = {
  theMap: PropTypes.object.isRequired,
  chronicleEvent: PropTypes.object.isRequired,
};

export default pure(ChronicleMarker);
