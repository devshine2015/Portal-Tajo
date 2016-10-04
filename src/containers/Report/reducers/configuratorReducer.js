import { fromJS, List } from 'immutable';
import {
  configuratorActions,
  loaderActions,
  dataActions,
} from '../actions';
import tempSpecs from '../specs/temperature';
import baseSpecs from '../specs/base';
import mileageSpecs from '../specs/mileage';
import idlingSpecs from '../specs/idling';
import statsSpecs from '../specs/stats';

// join arrays and filter for available ones
const specs = baseSpecs.concat(mileageSpecs, tempSpecs, idlingSpecs, statsSpecs).filter(spec =>
  !spec.hasOwnProperty('available') || spec.available
);
const checkedSpecs = specs.filter(({ checkedByDefault }) => checkedByDefault)
  .map((spec, i) => i);
const configuratorInitialState = fromJS({
  available: new List(specs),
  selected: new List(checkedSpecs),
  frequency: undefined,
  error: undefined,
  isLoading: false,
});

function configuratorReducer(state = configuratorInitialState, action) {
  switch (action.type) {
    case configuratorActions.CONFIGURATOR_FREQUENCY_CHANGE:
      return state.set('frequency', action.nextState);

    case configuratorActions.CONFIGURATOR_SELECTED_ADD:
      return state.updateIn(['selected'], selected =>
        selected.push(action.index)
      );

    case configuratorActions.CONFIGURATOR_SELECTED_REMOVE:
      return state.updateIn(['selected'], selected =>
        selected.delete(action.index)
      );

    case configuratorActions.CONFIGURATOR_ERROR_SET:
      return state.set('error', action.message);

    case dataActions.REPORT_BEFORE_GENERATING:
      return state.set('isLoading', true);

    case loaderActions.REPORT_CONFIGURATOR_LOADER_SET:
      return state.set('isLoading', action.nextState);

    case dataActions.REPORT_GENERATING_SUCCESS:
      return state.set('isLoading', false);

    case dataActions.REPORT_GENERATING_FAILURE:
      return state.withMutations(s => {
        s.set('isLoading', false)
         .set('error', action.message);
      });

    default:
      return state;
  }
}

export default configuratorReducer;

export const getAvailableFields = state =>
  state.getIn(['reports', 'configurator', 'available']);
export const getAvailableFieldIndex = (state, value) =>
  getAvailableFields(state).findKey((field) => (
    field.name === value
  ));
export const getSelectedFields = state =>
  state.getIn(['reports', 'configurator', 'selected']);
export const getSelectedFieldIndex = (state, value) =>
  getSelectedFields(state).indexOf(value);
export const getReportFrequency = state =>
  state.getIn(['reports', 'configurator', 'frequency']);

export const getErrorMessage = state =>
  state.get('error');

export const getLoadingState = state =>
  state.get('isLoading');
