// import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  EXEC_REPORT_ITEM_NEW_FRAME,
} from './actions';
import { createReportFrame } from './../utils/reportVehicleFrame';
import moment from 'moment';

const execReportInitialState = fromJS({
  // dateFrom: moment().subtract(1, 'days').toDate(),
  // dateTo: moment().toDate(),
  dateFrom: moment().subtract(1, 'days').toDate(),
  dateTo: moment().toDate(),
  localFrames: new Map(),
  validFramesCount: 0,
  durtyFlag: 0,
});
let drty = 2;
export default function execReportsReducer(state = execReportInitialState, action) {
  switch (action.type) {
    // case CHRONICLE_SET_TIMEFRAME:
    //   return state.set('dateFrom', (action.dateFrom))
    //       .set('dateTo', (action.dateTo));
    case EXEC_REPORT_ITEM_NEW_FRAME: {
      return state.setIn(['localFrames', action.vehicleId], action.reportFrame)
  // TODO: does not look like right way to update store....
          .set('durtyFlag', ++drty);
    }
    // // TODO: quick and dirty - just reset all
    // case CHRONICLE_VALIDATE_TIMEFRAME: {
    //   return state.set('localFrames', new Map()).set('validFramesCount', 0);
    // }
    default:
      return state;
  }
}

const dummyEmptyChronoFrame = createReportFrame();
export const getInstanceExecReportFrameById = (state) => (id) => {
  const chrFrame = state.getIn(['execReports', 'localFrames', id]);
  if (chrFrame === undefined) return dummyEmptyChronoFrame;
  chrFrame.ownerId = id;
  return chrFrame;
};

// export const getChronicleTimeFrame = (state) => ({
//   fromDate: state.getIn(['chronicle', 'dateFrom']).toJS(),
//   toDate: state.getIn(['chronicle', 'dateTo']).toJS(),
// });
