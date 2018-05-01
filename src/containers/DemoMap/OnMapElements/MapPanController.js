import React from 'react';

//
//
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { ifArraysEqual } from 'utils/arrays';
import { mapStoreGetPan } from '../reducerAction';

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
      this.props.theMap.panInsideBounds(window.L.latLngBounds(this.props.mapStoredPan));
    }
    this.latestPan = this.props.mapStoredPan;
  }

  render() {
    this.applyPan();
    return false;
  }
}

MapPanController.propTypes = {
  theMap: PropTypes.object.isRequired,
  mapStoredPan: PropTypes.array,
};

MapPanController.defaultProps = {
  mapStoredPan: null,
};

const mapState = (state) => ({
  mapStoredPan: mapStoreGetPan(state),
});

export default connect(mapState)(pure(MapPanController));
