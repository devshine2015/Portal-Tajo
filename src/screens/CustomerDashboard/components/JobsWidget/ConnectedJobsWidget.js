import { connect } from 'react-redux';
import { getPathToVehicles } from 'services/FleetModel/reducer';
import makeGetVehiclesNames from './selectors';
import JobsWidget from './JobsWidget';

const makeMapProps = () => {
  const getVehiclesNames = makeGetVehiclesNames();

  return function mapProps(state) {
    return {
      vehicles: getVehiclesNames(getPathToVehicles(state)),
    };
  };
};

export default connect(makeMapProps)(JobsWidget);
