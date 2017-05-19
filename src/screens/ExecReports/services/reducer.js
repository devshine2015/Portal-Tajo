// import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import {
  EXEC_SET_TIMEFRAME,
  EXEC_CLEAR_LOCAL,
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
  durtyFlag: 0,
});
let drty = 2;
export default function execReportsReducer(state = execReportInitialState, action) {
  switch (action.type) {
    // case EXEC_REPORT_TIMEFRAME:
    //   return state.set('dateFrom', (action.dateFrom))
    //       .set('dateTo', (action.dateTo));
    case EXEC_SET_TIMEFRAME:
      return state.set('dateFrom', (action.dateFrom))
          .set('dateTo', (action.dateTo));
    case EXEC_REPORT_ITEM_NEW_FRAME: {
      return state.setIn(['localFrames', action.vehicleId], action.reportFrame)
  // TODO: does not look like right way to update store....
          .set('durtyFlag', ++drty);
    }
    // // TODO: quick and dirty - just reset all
    case EXEC_CLEAR_LOCAL: {
      return state.set('localFrames', new Map());
    }
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

export const getExecTimeFrame = (state) => ({
  dateFrom: state.getIn(['execReports', 'dateFrom']),
  dateTo: state.getIn(['execReports', 'dateTo']),
});
