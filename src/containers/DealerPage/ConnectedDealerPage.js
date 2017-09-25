import { connect } from 'react-redux';
import dealerSelectors from 'services/Dealer/selectors';
import Page from './DealerPage';

const makeMapState = () => {
  return function mapState(state) {
    return {
      // eslint-disable-next-line import/no-named-as-default-member
      fleetReadyState: dealerSelectors.getFleetReadyState(state),
    };
  };
};

export default connect(makeMapState)(Page);
