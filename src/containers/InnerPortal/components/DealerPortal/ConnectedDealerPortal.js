import { connect } from 'react-redux';
import dealerFleetSelectors from 'services/DealerFleet/selectors';
import DealerPortal from './DealerPortal';

const makeMapStateToProps = () => {
  const mapState = (state) => {
    return {
      projectIsReady: dealerFleetSelectors.getReadyState(state), // eslint-disable-line import/no-named-as-default-member
    };
  };

  return mapState;
};

const actions = {
  fetchSpecificData: () => ({}),
};

export default connect(makeMapStateToProps, actions)(DealerPortal);
