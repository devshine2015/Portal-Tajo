// import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  CHRONICLE_SET_T,
  CHRONICLE_SET_TIMEFRAME,
  CHRONICLE_ITEM_NEW_FRAME,
  CHRONICLE_VALIDATE_TIMEFRAME,
  CHRONICLE_MWA_JOBS,
  CHRONICLE_CLEAR_FRAMES
} from './actions';
import createHistoryFrame from './utils/chronicleVehicleFrame';
import moment from 'moment';

const chronicleInitialState = fromJS({
  normalized100T: 0,
  // default time frame -24 hvrs from now on START of the app
  dateFrom: moment().subtract(1, 'days').toDate(),
  dateTo: moment().toDate(),
  localFrames: new Map(),
  validFramesCount: 0,
  durtyFlag: 0,
});
let drty = 2;
export default function chronicleReducer(state = chronicleInitialState, action) {
  switch (action.type) {
    case CHRONICLE_SET_T:
      return state.set('normalized100T', action.normalized100T);
    case CHRONICLE_SET_TIMEFRAME:
      return state.set('dateFrom', (action.dateFrom))
          .set('dateTo', (action.dateTo));
    case CHRONICLE_ITEM_NEW_FRAME: {
      let newState = state;
      if (action.chronicleFrame.isValid() && !action.chronicleFrame.isEmpty()) {
        newState = newState.set('validFramesCount', newState.get('validFramesCount') + 1);
      }
      return newState.setIn(['localFrames', action.vehicleId], action.chronicleFrame)
  // TODO: does not look like right way to update store....
          .set('durtyFlag', ++drty);
    }
    case CHRONICLE_MWA_JOBS: {
      const chrFrame = state.getIn(['localFrames', action.vehicleId]);
      chrFrame.mwaJobs = action.mwaJobs;
      return state.set('durtyFlag', ++drty);
  //     return state.setIn(['localFrames', action.vehicleId, 'mwaJobs'], action.mwaJobs)
  // // TODO: does not look like right way to update store....
  //         .set('durtyFlag', ++drty);
    }
    // // TODO: quick and dirty - just reset all
    case CHRONICLE_VALIDATE_TIMEFRAME: {
      return state.set('localFrames', new Map()).set('validFramesCount', 0);
    }
    case CHRONICLE_CLEAR_FRAMES: {
      return state.set('localFrames', new Map());
    }
    default:
      return state;
  }
}

export const getNormalized100T = (state) =>
  state.getIn(['chronicle', 'normalized100T']);

export const getChronicleTimeFrame = (state) => ({
  fromDate: state.getIn(['chronicle', 'dateFrom']),
  toDate: state.getIn(['chronicle', 'dateTo']),
});

export const hasChroniclePlayableFrames = (state) =>
  (state.getIn(['chronicle', 'validFramesCount']) > 0);

const dummyEmptyChronoFrame = createHistoryFrame();
export const getInstanceChronicleFrameById = (state) => (id) => {
  const chrFrame = state.getIn(['chronicle', 'localFrames', id]);
  if (chrFrame === undefined) return dummyEmptyChronoFrame;
  chrFrame.ownerId = id;
  return chrFrame;
};

// export const getChronicleTimeFrame = (state) => ({
//   fromDate: state.getIn(['chronicle', 'dateFrom']).toJS(),
//   toDate: state.getIn(['chronicle', 'dateTo']).toJS(),
// });
