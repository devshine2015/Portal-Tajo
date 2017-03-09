import { combineReducers } from 'redux-immutable';
import { List } from 'immutable';
import { reportActions } from './actions';
import configuratorReducer, * as fromConfigReducer from './reducers/configuratorReducer';
import availableVehiclesReducer, * as fromVehiclesReducer from './reducers/vehiclesReducer';

const dataInitialState = new List();

function dataReducer(state = dataInitialState, action) {
  switch (action.type) {
    case reportActions.REPORT_DATA_SAVE:
    case reportActions.REPORT_GENERATING_SUCCESS:
      return new List(action.reportData);

    case reportActions.REPORT_DATA_REMOVE:
    case reportActions.REPORT_BEFORE_GENERATING:
      return new List();

    default:
      return state;
  }
}

export default combineReducers({
  configurator: configuratorReducer,
  vehicles: availableVehiclesReducer,
  data: dataReducer,
});

function getConfigurator(s) {
  return s.getIn(['reports', 'configurator']);
}

function getVehicles(s) {
  return s.getIn(['reports', 'vehicles']);
}

export const getSavedReportData = (state) =>
  state.getIn(['reports', 'data']);
export const appHasStoredReport = (state) =>
  state.getIn(['reports', 'data']).size !== 0;


export const getAvailableReports = state =>
  fromConfigReducer.getAvailableReports(getConfigurator(state));

export const getAvailableReportIndex = (state, value) =>
  fromConfigReducer.getAvailableReportIndex(getConfigurator(state), value);

export const getSelectedReports = state =>
  fromConfigReducer.getSelectedReports(getConfigurator(state));

export const getSelectedReportIndex = (state, value) =>
  fromConfigReducer.getSelectedReportIndex(getConfigurator(state), value);

export const getAvailableEvents = state =>
  fromConfigReducer.getAvailableEvents(getConfigurator(state));

export const getAvailableEventIndex = (state, value) =>
  fromConfigReducer.getAvailableEventIndex(getConfigurator(state), value);

export const getSelectedEvents = state =>
  fromConfigReducer.getSelectedEvents(getConfigurator(state));

export const getSelectedEventIndex = (state, value) =>
  fromConfigReducer.getSelectedEventIndex(getConfigurator(state), value);

export const getIsTooManyVehiclesSelected = state =>
  fromConfigReducer.getIsTooManyVehiclesSelected(getConfigurator(state));

export const getIsForced = state =>
  fromConfigReducer.getIsForced(getConfigurator(state));

export const getLoadingState = state =>
  fromConfigReducer.getLoadingState(getConfigurator(state));

export const getSelectedVehicles = state =>
  fromVehiclesReducer.getSelectedVehicles(getVehicles(state));

export const getSelectedVehiclesAmount = state =>
  fromVehiclesReducer.getSelectedVehiclesAmount(getVehicles(state));

export const isVehicleAlreadyAdded = (state, id) =>
  fromVehiclesReducer.findIndexById(getVehicles(state), id);

export const getIsFiltering = (state) =>
  fromVehiclesReducer.isFiltering(getVehicles(state));
