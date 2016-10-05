import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import reportsReducer, * as fromReportsReducer from './reportsReducer';
import {
  configuratorActions,
  loaderActions,
  reportActions,
} from '../actions';

const initialState = fromJS({
  isLoading: false,
  error: undefined,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case configuratorActions.CONFIGURATOR_ERROR_SET:
      return state.set('error', action.message);

    case loaderActions.REPORT_CONFIGURATOR_LOADER_SET:
      return state.set('isLoading', action.nextState);

    case reportActions.REPORT_BEFORE_GENERATING:
      return state.set('isLoading', true);

    case reportActions.REPORT_GENERATING_SUCCESS:
      return state.set('isLoading', false);

    case reportActions.REPORT_GENERATING_FAILURE:
      return state.withMutations(s => {
        s.set('isLoading', false)
         .set('error', action.message);
      });

    default:
      return state;
  }
}

export default combineReducers({
  reportTypes: reportsReducer,
  common: reducer,
});

function getReportTypes(s) {
  return s.get('reportTypes');
}

export const getAvailableFields = state =>
  fromReportsReducer.getAvailableFields(getReportTypes(state));

export const getAvailableFieldIndex = (state, value) =>
  fromReportsReducer.getAvailableFieldIndex(getReportTypes(state), value);

export const getSelectedFields = state =>
  fromReportsReducer.getSelectedFields(getReportTypes(state));

export const getSelectedFieldIndex = (state, value) =>
  fromReportsReducer.getSelectedFieldIndex(getReportTypes(state), value);

export const getErrorMessage = state =>
  state.getIn(['common', 'error']);

export const getLoadingState = state =>
  state.getIn(['common', 'isLoading']);
