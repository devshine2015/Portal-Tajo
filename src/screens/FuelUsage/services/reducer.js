//
// no need to use immutable here, can do without - not to overcomplicate things
//
// ??
// import { fromJS } from 'immutable';


import {
  UPDATE_VEHICLE_FUEL_REPORT,
} from './actions';

const fuelReportsInitialState = ({
  localReports: {},
});
export default function fuelReportsReducer(state = fuelReportsInitialState, action) {
  switch (action.type) {
    case UPDATE_VEHICLE_FUEL_REPORT:
      return state;
    default:
      return state;
  }
}

// export const getFuelReportById = state => (vehicleId) => {
//   // const fuelData = state.getIn(['chronicle', 'localFrames', id]);
//   // if (chrFrame === undefined) return dummyEmptyChronoFrame;
//   // chrFrame.ownerId = id;
//   // return chrFrame;
// };
