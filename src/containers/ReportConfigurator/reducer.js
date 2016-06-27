import { combineReducers } from 'redux-immutable';
import { fromJS, List } from 'immutable';
import moment from 'moment';
import { loaderActions, dataActions, configuratorActions } from './actions/index';

const loaderInitialState = fromJS({
  isLoading: false,
});
const dataInitialState = new List();
const configuratorInitialState = fromJS({
  available: new List([{
    label: 'Vehicle Name',
    name: 'name',
    reportType: 'vehicles',
    order: 0,
    calc: (vehicles) => vehicles.map(v => v.name),
  }, {
    label: 'License Plate',
    name: 'license',
    reportType: 'license',
    order: 1,
    calc: (vehicles) => vehicles.map(v => v.licensePlate),
  }, {
    label: 'Driving Distance',
    name: 'mileage',
    reportType: 'mileage',
    endpoint: 'mileage',
    order: 2,
    calc: (records = [], date) => records.map(({ reportRecords }) => (
      reportRecords.filter(rec => (
        moment(date).isSame(moment(rec.time).toISOString(), 'day')
      )).map(result => result.distance)[0]
    )),
  }, {
    label: 'Min. Temperature',
    name: 'minTemp',
    endpoint: 'temperature',
    reportType: 'minTemp',
    order: 3,
    query: 'downsampleSec=0',
    calc: (records = [], date) => records.map(({ reportRecords }) => {
      const filtered = reportRecords.filter(rec => (
        moment(date).isSame(moment(rec.time).toISOString(), 'day')
      ));

      if (filtered.length === 0) {
        return 'n/a';
      }

      let minTemp = filtered[0].temp;

      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].temp < minTemp) {
          minTemp = filtered[i].temp;
        }
      }

      return minTemp;
    }),
  }, {
    label: 'Max. Temperature',
    name: 'maxTemp',
    endpoint: 'temperature',
    reportType: 'maxTemp',
    order: 4,
    query: 'downsampleSec=0',
    calc: (records = [], date) => records.map(({ reportRecords }) => {
      const filtered = reportRecords.filter(rec => (
        moment(date).isSame(moment(rec.time).toISOString(), 'day')
      ));

      if (filtered.length === 0) {
        return 'n/a';
      }

      let maxTemp = filtered[0].temp;

      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].temp > maxTemp) {
          maxTemp = filtered[i].temp;
        }
      }

      return maxTemp;
    }),
  }, {
    label: 'Average Temperature',
    name: 'avgTemp',
    endpoint: 'temperature',
    reportType: 'avgTemp',
    order: 5,
    query: 'downsampleSec=0',
    calc: (records = [], date) => records.map(({ reportRecords }) => {
      const filtered = reportRecords.filter(rec => (
        moment(date).isSame(moment(rec.time).toISOString(), 'day')
      ));

      if (filtered.length === 0) {
        return 'n/a';
      }

      let tempSum = 0;

      for (let i = 0; i < filtered.length; i++) {
        tempSum += filtered[i].temp;
      }

      return tempSum / filtered.length;
    }),
  }]),
  selected: new List(),
});

function configuratorReducer(state = configuratorInitialState, action) {
  switch (action.type) {
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
