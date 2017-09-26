import { connect } from 'react-redux';
import { getVehiclesExSorted, reducerKey } from 'services/FleetModel/reducers/vehiclesReducer';
import PowerList from './PowerList';

const makeMapState = () => {
  const mapState = (state) => {
    const vehicles = getVehiclesExSorted(state.get(reducerKey));

    return {
      vehicles,
    };
  };

  return mapState;
};

export default connect(makeMapState)(PowerList);
