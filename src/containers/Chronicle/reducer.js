// import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { CHRONICLE_SET_T, CHRONICLE_SET_TIMEFRAME,
        CHRONICLE_ITEM_NEW_FRAME,
        CHRONICLE_ITEM_SET_STATE,
        CHRONICLE_VALIDATE_TIMEFRAME, } from './actions';
import createHistoryFrame from './utils/chronicleVehicleFrame';

const chronicleInitialState = fromJS({
  normalized100T: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  localFrames: new Map(),
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
      return state.setIn(['localFrames', action.vehicleId], action.chronicleFrame)
        .set('durtyFlag', ++drty);
    }
    // // TODO: quick and dirty - just reset all
    case CHRONICLE_VALIDATE_TIMEFRAME: {
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
