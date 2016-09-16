import React from 'react';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';
import { hideLayer } from 'utils/mapBoxMap';
import { dateToChronicleLable, msToDurtationLable } from 'containers/Chronicle/utils/strings';

import TimeIcon from 'material-ui/svg-icons/device/access-time';
import FontIcon from 'material-ui/FontIcon';

class ChronicleMarker extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = props.theLayer;
    this.theMarker = null;
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
      // '<i class="muidocs-icon-action-home" style="font-size:32px">access_time</i>',
    // dateToChronicleString(this.props.chronicleEvent.date),
      {
        offset: [0, 0],
//              className: 'ddsMapHistorySecondaryPopup',
        closeButton: false,
        closeOnClick: false,
        autoPan: false,
        keepInView: false,
        zoomAnimation: true,
      });
    hideLayer(this.containerLayer, this.theMarker, false);
  }

  removeMarker() {
    if (this.containerLayer === null) {
      return;
    }
    hideLayer(this.containerLayer, this.theMarker, true);
  }

  render() {
    this.setUp();
    return false;
  }
}

ChronicleMarker.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  chronicleEvent: React.PropTypes.object.isRequired,
};

const PureChronicleMarker = pure(ChronicleMarker);
export default PureChronicleMarker;
// export default connect(mapState)(PureChronicleMarker);
