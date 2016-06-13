import { fromJS, List } from 'immutable';
import {
  REPORT_SCREEN_SET_LOADER,
  REPORT_SCREEN_SET_REPORT_DATA,
  REPORT_SCREEN_RESET_REPORT_DATA,
} from './actions';

const initialState = fromJS({
  isLoading: false,
  reportData: new List(),
});

export default function reportsReducer(state = initialState, action) {
  switch (action.type) {
    case REPORT_SCREEN_SET_LOADER: {
      return state.set('isLoading', action.nextState);
    }
    case REPORT_SCREEN_SET_REPORT_DATA: {
      return state.set('reportData', new List(action.reportData));
    }
    case REPORT_SCREEN_RESET_REPORT_DATA: {
      return state.set('reportData', new List());
    }
    default:
      return state;
  }
}
