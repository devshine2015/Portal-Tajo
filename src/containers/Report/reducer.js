import { combineReducers } from 'redux-immutable';
import { List } from 'immutable';
import { reportActions } from './actions';
import configuratorReducer, * as fromConfigReducer from './reducers/configuratorReducer';
import availableVehiclesReducer, * as fromVehiclesReducer from './reducers/vehiclesReducer';

const dataInitialState = new List();

function dataReducer(state = dataInitialState, action) {
  switch (action.type) {
    case reportActions.REPORT_DATA_SAVE:
      return new List(action.reportData);

    case reportActions.REPORT_GENERATING_SUCCESS:
      return new List(action.reportData);

    case reportActions.REPORT_DATA_REMOVE:
      return new List();

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

export const getSavedReportData = (state) =>
  state.getIn(['reports', 'data']);
export const appHasStoredReport = (state) =>
  state.getIn(['reports', 'data']).size !== 0;


export const getAvailableFields = state =>
  fromConfigReducer.getAvailableFields(getConfigurator(state));

export const getAvailableFieldIndex = (state, value) =>
  fromConfigReducer.getAvailableFieldIndex(getConfigurator(state), value);

export const getSelectedFields = state =>
  fromConfigReducer.getSelectedFields(getConfigurator(state));

export const getSelectedFieldIndex = (state, value) =>
  fromConfigReducer.getSelectedFieldIndex(getConfigurator(state), value);

export const getErrorMessage = (state) =>
  fromConfigReducer.getErrorMessage(getConfigurator(state));
export const getLoadingState = state =>
  fromConfigReducer.getLoadingState(getConfigurator(state));

export const getSelectedVehicles = (state) =>
  fromVehiclesReducer.getSelectedVehicles(state.getIn(['reports', 'vehicles']));
export const isVehicleAlreadyAdded = (state, id) =>
  fromVehiclesReducer.findIndexById(state.getIn(['reports', 'vehicles']), id);

export const getIsFiltering = (state) =>
  fromVehiclesReducer.isFiltering(state.getIn(['reports', 'vehicles']));
