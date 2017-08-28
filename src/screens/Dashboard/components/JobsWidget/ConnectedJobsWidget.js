import { connect } from 'react-redux';
import { makeGetVehiclesNames } from 'services/FleetModel/selectors';
import { getPathToVehicles } from 'services/FleetModel/reducer';
import JobsWidget from './JobsWidget';

const makeMapProps = () => {
  const getVehiclesNames = makeGetVehiclesNames();

  return function (state) {
    return {
      vehicles: getVehiclesNames(getPathToVehicles(state)),
    };
  };
};

export default connect(makeMapProps)(JobsWidget);
