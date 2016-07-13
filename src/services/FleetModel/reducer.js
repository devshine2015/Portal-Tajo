import { combineReducers } from 'redux-immutable';
import vehiclesReducer, * as fromVehiclesReducer from './reducers/vehiclesReducer';

export default combineReducers({
  vehicles: vehiclesReducer,
});

export const getFleetData = (state) =>
  state.get('fleet');
export const getVehicles = (state) =>
  fromVehiclesReducer.getVehicles(state.getIn(['fleet', 'vehicles']));
