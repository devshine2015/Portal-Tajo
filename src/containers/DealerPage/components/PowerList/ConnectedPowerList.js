import { connect } from 'react-redux';
// import { getVehiclesExSorted, reducerKey } from 'services/FleetModel/reducers/vehiclesReducer';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import PowerList from './PowerList';

const makeMapState = () => {
  const mapState = (state) => {
    // const vehicles = getVehiclesExSorted(state.get(reducerKey));
    const vehicles = fromFleetReducer.getVehiclesExSorted(state);
    
    return {
      vehicles,
    };
  };

  return mapState;
};

export default connect(makeMapState)(PowerList);
