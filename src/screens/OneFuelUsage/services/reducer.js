//
// no need to use immutable here, can do without - not to overcomplicate things
//
// ??
// import { fromJS } from 'immutable';


import {
  UPDATE_VEHICLE_FUEL_REPORT,
  UPDATE_VEHICLE_FUEL_REPORT_TIME,
  VEHICLE_FUEL_REPORT_LOADING,
} from './actions';

const fuelReportsInitialState = {
  localReports: {},
  timeRange: {},
  isLoading: false,
};
export default function fuelReportsReducer(state = fuelReportsInitialState, action) {
  // console.log(action.consumption);
  switch (action.type) {
    case UPDATE_VEHICLE_FUEL_REPORT:
      return Object.assign({}, state, {
        localReports: action.consumption,
      });
    case UPDATE_VEHICLE_FUEL_REPORT_TIME:
      return Object.assign({}, state, {
        timeRange: action.timeRange,
      });
    case VEHICLE_FUEL_REPORT_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}

const _fuelUseageSlice = state =>
  state.get('fuelUsage');

export const getFuelReport = state =>
  _fuelUseageSlice(state).localReports;

export const getFuelReportForVehicle = state => vehicleId =>
  _fuelUseageSlice(state).localReports[vehicleId];

export const getFuelReportTimeRange = state =>
  _fuelUseageSlice(state).timeRange;

export const getFuelReportLoadingState = state =>
  _fuelUseageSlice(state).isLoading;

  // export const getFuelReportById = state => (vehicleId) => {
//   // const fuelData = state.getIn(['chronicle', 'localFrames', id]);
//   // if (chrFrame === undefined) return dummyEmptyChronoFrame;
//   // chrFrame.ownerId = id;
//   // return chrFrame;
// };
