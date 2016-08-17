import { combineReducers } from 'redux-immutable';
import vehiclesReducer, * as fromVehiclesReducer from './reducers/vehiclesReducer';
import locationsReducer, * as fromLocationsReducer from './reducers/locationsReducer';

export default combineReducers({
  vehicles: vehiclesReducer,
  locations: locationsReducer,
});

const getByIdFunc = (state) => (id) => {
  const theMapObj = state.get('processedList');
  if (theMapObj.size === 0) {
    return null;
  }
  const theObj = theMapObj.get(id);
  if (theObj === undefined) {
    return null;
  }
  return theObj.toJS();
};

export const getFleetData = (state) =>
  state.get('fleet');
export const getVehicles = (state) =>
  fromVehiclesReducer.getVehicles(state.getIn(['fleet', 'vehicles']));
export const getVehiclesById = (state, ids = []) =>
  fromVehiclesReducer.getVehiclesById(state.getIn(['fleet', 'vehicles']), ids);
export const getVehiclesEx = (state) =>
  fromVehiclesReducer.getVehiclesEx(state.getIn(['fleet', 'vehicles']));
export const getVehicleByIdFunc = (state) =>
  getByIdFunc(state.getIn(['fleet', 'vehicles']));
//  fromVehiclesReducer.getVehicleByIdFunc(state.getIn(['fleet', 'vehicles']));
export const getLocations = (state) =>
  fromLocationsReducer.getLocations(state.getIn(['fleet', 'locations']));
export const getLocationsEx = (state) =>
  fromLocationsReducer.getLocationsEx(state.getIn(['fleet', 'locations']));
export const getLocationByIdFunc = (state) =>
  getByIdFunc(state.getIn(['fleet', 'locations']));
