import { connect } from 'react-redux';
import Page from './DealerPage';

const makeMapState = () => {
  return function (/* state */) {
    return {
      fleetReadyState: 'not ready',
    };
  };
};

export default connect(makeMapState)(Page);
