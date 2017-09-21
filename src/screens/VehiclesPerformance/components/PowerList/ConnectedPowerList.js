import { connect } from 'react-redux';
import dealerFleetService from 'services/DealerFleet/selectors';
import PowerList from './PowerList';

const makeMapState = () => {
  const mapState = (state) => {
    const vehicles = dealerFleetService.getVehicles(state); // eslint-disable-line import/no-named-as-default-member

    return {
      vehicles: Object.values(vehicles.toJS()),
    };
  };

  return mapState;
};

export default connect(makeMapState)(PowerList);
