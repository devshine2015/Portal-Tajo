import React from 'react';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';
import { hideLayer } from 'utils/mapBoxMap';
import { dateToChronicleLable, msToDurtationLable } from 'screens/Chronicle/utils/strings';

import TimeIcon from 'material-ui/svg-icons/device/access-time';
import FontIcon from 'material-ui/FontIcon';

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

  // <FontIcon
  //   className="muidocs-icon-action-home"
  //   style={iconStyles}
  // />
  setUp() {
    if (this.theMarker !== null) {
      return;
    }
    this.theMarker = window.L.marker(this.props.chronicleEvent.pos)
    .bindPopup(dateToChronicleLable(this.props.chronicleEvent.date)
    + '<br>'
    + msToDurtationLable(this.props.chronicleEvent.period),
      {
        offset: [0, 0],
//              className: 'ddsMapHistorySecondaryPopup',
        closeButton: false,
        closeOnClick: false,
        autoPan: false,
        keepInView: false,
        zoomAnimation: true,
      });
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
  theMap: React.PropTypes.object.isRequired,
  chronicleEvent: React.PropTypes.object.isRequired,
};

export default pure(ChronicleMarker);
