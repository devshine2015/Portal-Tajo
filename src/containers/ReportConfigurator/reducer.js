import { combineReducers } from 'redux-immutable';
import { fromJS, List } from 'immutable';
import { loaderActions, dataActions, configuratorActions } from './actions/index';
import tempSpecs from './specs/temperature';
import baseSpecs from './specs/base';
import mileageSpecs from './specs/mileage';

const loaderInitialState = fromJS({
  isLoading: false,
});
const dataInitialState = new List();

const specs = baseSpecs.concat(mileageSpecs, tempSpecs);
const checkedSpecs = specs.filter(({ checkedByDefault }) => checkedByDefault)
  .map((spec, i) => i);
const configuratorInitialState = fromJS({
  available: new List(specs),
  selected: new List(checkedSpecs),
  frequency: undefined,
});

function configuratorReducer(state = configuratorInitialState, action) {
  switch (action.type) {
    case configuratorActions.REPORT_CONFIGURATOR_FREQUENCY_CHANGE:
      return state.set('frequency', action.nextState);
    case configuratorActions.REPORT_CONFIGURATOR_SELECTED_ADD:
      return state.updateIn(['selected'], selected =>
        selected.push(action.index)
      );
    case configuratorActions.REPORT_CONFIGURATOR_SELECTED_REMOVE:
      return state.updateIn(['selected'], selected =>
        selected.delete(action.index)
      );
    default:
      return state;
  }
}

function loaderReducer(state = loaderInitialState, action) {
  switch (action.type) {
    case loaderActions.REPORT_SCREEN_LOADER_SET: {
      return state.set('isLoading', action.nextState);
    }
    default:
      return state;
  }
}

function dataReducer(state = dataInitialState, action) {
  switch (action.type) {
    case dataActions.REPORT_DATA_SAVE: {
      return new List(action.reportData);
    }
    case dataActions.REPORT_DATA_REMOVE: {
      return new List();
    }
    default:
      return state;
  }
}

export default combineReducers({
  configurator: configuratorReducer,
  data: dataReducer,
  loader: loaderReducer,
});

export const getSavedReportData = (state) =>
  state.getIn(['reports', 'data']);
export const appHasStoredReport = (state) =>
  state.getIn(['reports', 'data']).size !== 0;
export const getReportLoadingState = (state) =>
  state.getIn(['reports', 'loader', 'isLoading']);
export const getAvailableFields = (state) =>
  state.getIn(['reports', 'configurator', 'available']);
export const getAvailableFieldIndex = (state, value) =>
  getAvailableFields(state).findKey((field) => (
    field.name === value
  ));
export const getSelectedFields = (state) =>
  state.getIn(['reports', 'configurator', 'selected']);
export const getSelectedFieldIndex = (state, value) =>
  getSelectedFields(state).indexOf(value);
export const getReportFrequency = (state) =>
  state.getIn(['reports', 'configurator', 'frequency']);
