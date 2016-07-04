import { fromJS, List } from 'immutable';
import { configuratorActions } from '../actions';
import tempSpecs from '../specs/temperature';
import baseSpecs from '../specs/base';
import mileageSpecs from '../specs/mileage';
import eventsSpecs from '../specs/events';

const specs = baseSpecs.concat(mileageSpecs, tempSpecs, eventsSpecs);
const checkedSpecs = specs.filter(({ checkedByDefault }) => checkedByDefault)
  .map((spec, i) => i);
const configuratorInitialState = fromJS({
  available: new List(specs),
  selected: new List(checkedSpecs),
  frequency: undefined,
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
    default:
      return state;
  }
}

export default configuratorReducer;

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
