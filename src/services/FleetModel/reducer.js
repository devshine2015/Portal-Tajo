import { combineReducers } from 'redux-immutable';
import vehiclesReducer, * as fromVehiclesReducer from './reducers/vehiclesReducer';
import gfReducer, * as fromgfReducer from './reducers/gfReducer';

export default combineReducers({
  vehicles: vehiclesReducer,
  locations: gfReducer,
});

const getByIdFunc = state => id => {
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

function vehicles(s) {
  return s.getIn(['fleet', 'vehicles']);
}

function locations(s) {
  return s.getIn(['fleet', 'locations']);
}

export const getFleetData = state =>
  state.get('fleet');

export const getVehiclesAmount = state =>
  fromVehiclesReducer.getVehiclesAmount(vehicles(state));

export const getVehicles = state =>
  fromVehiclesReducer.getVehicles(vehicles(state));
export const getVehiclesById = (state, ids = []) =>
  fromVehiclesReducer.getVehiclesById(vehicles(state), ids);
export const getVehiclesEx = state =>
  fromVehiclesReducer.getVehiclesEx(vehicles(state));
export const getVehiclesExSorted = state =>
  fromVehiclesReducer.getVehiclesExSorted(vehicles(state));
export const getVehicleByIdFunc = state =>
  getByIdFunc(vehicles(state));
export const getProcessedVehicles = state =>
  fromVehiclesReducer.getProcessedVehicles(vehicles(state));
export const hasProcessedVehicles = state =>
  fromVehiclesReducer.hasProcessedVehicles(vehicles(state));
export const getSelectedVehicleId = state =>
  fromVehiclesReducer.getSelectedVehicleId(vehicles(state));

export const getGFs = state =>
  fromgfReducer.getGFs(locations(state));
export const getGFsEx = state =>
  fromgfReducer.getGFsEx(locations(state));
export const getGFsExSorted = state =>
  fromgfReducer.getGFsExSorted(locations(state));
export const getGFByIdFunc = state =>
  getByIdFunc(locations(state));
export const getProcessedGFs = state =>
  fromgfReducer.getProcessedGFs(locations(state));
