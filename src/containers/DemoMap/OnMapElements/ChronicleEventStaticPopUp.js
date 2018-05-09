import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';
import { hideLayer } from 'utils/mapBoxMap';
import { dateToChronicleLable, msToDurtationLable } from 'screens/DemoChronicle/utils/strings';

class ChroniclePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.thePopUp = null;
  }

  componentWillMount() {
    this.setUp();
  }

  componentWillUnmount() {
// TODO: need to delete MapBox markers?
    this.removePopUp();
  }

  setUp() {
    if (this.thePopUp !== null) {
      return;
    }
    this.thePopUp = window.L.popup({
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

    hideLayer(this.props.theMap, this.thePopUp, false);
  }

  removePopUp() {
    if (this.props.theMap === null) {
      return;
    }
    hideLayer(this.props.theMap, this.thePopUp, true);
  }

  render() {
    // this.setUp();
    return false;
  }
}

ChroniclePopUp.propTypes = {
  theMap: PropTypes.object.isRequired,
  chronicleEvent: PropTypes.object.isRequired,
};

export default pure(ChroniclePopUp);
