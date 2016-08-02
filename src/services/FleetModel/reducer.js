import { combineReducers } from 'redux-immutable';
import vehiclesReducer, * as fromVehiclesReducer from './reducers/vehiclesReducer';
import locationsReducer, * as fromLocationsReducer from './reducers/locationsReducer';

export default combineReducers({
  vehicles: vehiclesReducer,
  locations: locationsReducer,
});

export const getFleetData = (state) =>
  state.get('fleet');
export const getVehicles = (state) =>
  fromVehiclesReducer.getVehicles(state.getIn(['fleet', 'vehicles']));
export const getVehiclesEx = (state) =>
  fromVehiclesReducer.getVehiclesEx(state.getIn(['fleet', 'vehicles']));
export const getVehicleByIdFunc = (state) =>
  fromVehiclesReducer.getVehicleByIdFunc(state.getIn(['fleet', 'vehicles']));
export const getLocations = (state) =>
  fromLocationsReducer.getLocations(state.getIn(['fleet', 'locations']));
