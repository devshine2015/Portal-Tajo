import { connect } from 'react-redux';
import makeGetVehicles from './selectors';
import Component from './WindowedSummary';

function makeMapState() {
  const getVehicles = makeGetVehicles();

  return function mapProps(state) {
    return {
      vehicles: getVehicles(state),
    };
  };
}

export default connect(makeMapState)(Component);
