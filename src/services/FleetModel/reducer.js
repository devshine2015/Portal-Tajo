// import { createReducer } from 'redux';
import { fromJS, Map } from 'immutable';
import { SERVICE_FLEET_MODEL_SET } from './actions';

const initialVehiclesMap = fromJS({
  vehiclesMap: new Map(),
});

function vehiclesMapReducer(state = initialVehiclesMap, action) {
  switch (action.type) {
    case SERVICE_FLEET_MODEL_SET:
      return state.set('vehiclesMap', new Map(action.backendData));
    default:
      return state;
  }
}

export default vehiclesMapReducer;

export const getFleetData = (state) =>
  state.getIn(['fleetModel', 'vehiclesMap']);
