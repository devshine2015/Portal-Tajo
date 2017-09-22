import { connect } from 'react-redux';
import dealerService from 'services/Dealer/selectors';
import DealerPortal from './DealerPortal';

const makeMapStateToProps = () => {
  const mapState = (state) => {
    return {
      // eslint-disable-next-line
      readyToShowPortal: dealerService.getReadyState(state),
    };
  };

  return mapState;
};

export default connect(makeMapStateToProps)(DealerPortal);
