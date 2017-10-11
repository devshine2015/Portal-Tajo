import { connect } from 'react-redux';
import dealerSelectors from 'services/Dealer/selectors';
import { changeFleet } from 'services/Dealer/actions';
import FleetSelector from 'components/FleetSelector';

const makeMapState = () => {
  const mapState = (state) => {
    return {
      // eslint-disable-next-line import/no-named-as-default-member
      fleets: dealerSelectors.getSubfleets(state),
      // eslint-disable-next-line import/no-named-as-default-member
      fleetReadyState: dealerSelectors.getFleetReadyState(state),
    };
  };

  return mapState;
};

const actions = {
  onSelect: changeFleet,
};

export default connect(makeMapState, actions)(FleetSelector);
