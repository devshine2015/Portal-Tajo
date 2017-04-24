//
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { ifArraysEqual } from 'utils/arrays';
import { mapStoreGetPan } from './reducerAction';

class MapPanController extends React.Component {

  constructor(props) {
    super(props);
    this.latestPan = [];
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.routeToLatLng[0] !== nextProps.routeToLatLng[0];
  // }

  applyPan() {
    if (this.props.mapStoredPan !== null
        && (this.latestPan === null
            || !ifArraysEqual(this.props.mapStoredPan, this.latestPan))) {
      this.state.theMap.panInsideBounds(window.L.latLngBounds(this.props.mapStoredPan));
    }
    this.latestPan = this.props.mapStoredPan;
  }

  render() {
    this.applyPan();
    return false;
  }
}

MapPanController.propTypes = {
  theMap: React.PropTypes.object,
  mapStoredPan: React.PropTypes.array,
};

const mapState = (state) => ({
  mapStoredPan: mapStoreGetPan(state),
});

export default connect(mapState)(pure(MapPanController));
