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

export function getPathToVehicles(s) {
  return s.getIn(['fleet', 'vehicles']);
}

function locations(s) {
  return s.getIn(['fleet', 'locations']);
}

export const getFleetData = state =>
  state.get('fleet');

export const getVehiclesAmount = state =>
  fromVehiclesReducer.getVehiclesAmount(getPathToVehicles(state));

export const getVehiclesEx = state =>
  fromVehiclesReducer.getVehiclesEx(getPathToVehicles(state));
export const getVehiclesExSorted = state =>
  fromVehiclesReducer.getVehiclesExSorted(getPathToVehicles(state));
export const getVehiclesTest = state =>
  fromVehiclesReducer.getVehiclesTest(getPathToVehicles(state));
export const getVehicleByIdFunc = state =>
  getByIdFunc(getPathToVehicles(state));
export const getProcessedVehicles = state =>
  fromVehiclesReducer.getProcessedVehicles(getPathToVehicles(state));
export const hasProcessedVehicles = state =>
  fromVehiclesReducer.hasProcessedVehicles(getPathToVehicles(state));
export const getSelectedVehicleId = state =>
  fromVehiclesReducer.getSelectedVehicleId(getPathToVehicles(state));
export const getDeadList = state =>
  fromVehiclesReducer.getDeadList(getPathToVehicles(state));
export const getDelayedList = state =>
  fromVehiclesReducer.getDelayedList(getPathToVehicles(state));
export const getDeadAmount = state =>
  fromVehiclesReducer.getDeadAmount(getPathToVehicles(state));
export const getDelayedAmount = state =>
  fromVehiclesReducer.getDelayedAmount(getPathToVehicles(state));
export const getAmounts = state =>
  fromVehiclesReducer.getAmounts(getPathToVehicles(state));

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
