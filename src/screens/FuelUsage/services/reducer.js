//
// no need to use immutable here, can do without - not to overcomplicate things
//
// ??
// import { fromJS } from 'immutable';


import {
  UPDATE_VEHICLE_FUEL_REPORT,
} from './actions';

const fuelReportsInitialState = {
  localReports: {},
};
export default function fuelReportsReducer(state = fuelReportsInitialState, action) {
  // console.log(action.consumption);
  switch (action.type) {
    case UPDATE_VEHICLE_FUEL_REPORT:
      return Object.assign({}, state, {
        localReports: action.consumption,
      });
    default:
      return state;
  }
}

const _fuelUseageSlice = state =>
  state.get('fuelUseage');

export const getFuelReport = state =>
  _fuelUseageSlice(state).localReports;

export const getFuelReportForVehicle = state => vehicleId =>
  _fuelUseageSlice(state).localReports[vehicleId];

// export const getFuelReportById = state => (vehicleId) => {
//   // const fuelData = state.getIn(['chronicle', 'localFrames', id]);
//   // if (chrFrame === undefined) return dummyEmptyChronoFrame;
//   // chrFrame.ownerId = id;
//   // return chrFrame;
// };
