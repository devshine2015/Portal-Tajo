import { combineReducers } from 'redux-immutable';
import vehiclesReducer, * as fromVehiclesReducer from './reducers/vehiclesReducer';
import gfReducer, * as fromgfReducer from './reducers/gfReducer';

export default combineReducers({
  vehicles: vehiclesReducer,
  locations: gfReducer,
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
export const getGFs = (state) =>
  fromgfReducer.getGFs(state.getIn(['fleet', 'locations']));
export const getGFsEx = (state) =>
  fromgfReducer.getGFsEx(state.getIn(['fleet', 'locations']));
export const getGFByIdFunc = (state) =>
  getByIdFunc(state.getIn(['fleet', 'locations']));
