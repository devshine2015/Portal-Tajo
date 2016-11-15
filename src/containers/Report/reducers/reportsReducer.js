import { fromJS, List } from 'immutable';
import { reportActions } from '../actions';
import tempSpecs from '../specs/temperature';
import baseSpecs from '../specs/base';
import mileageSpecs from '../specs/mileage';
// import idlingSpecs from '../specs/idling';
import statsSpecs from '../specs/stats';

// join arrays and filter for available ones
const specs = baseSpecs
//  .concat(mileageSpecs, tempSpecs, idlingSpecs, statsSpecs)
  .concat(mileageSpecs, tempSpecs, statsSpecs)
  .filter(spec =>
    !spec.hasOwnProperty('available') || spec.available
  );
const checkedSpecs = specs
  .filter(({ checkedByDefault }) => checkedByDefault)
  .map((spec, i) => i);

const configuratorInitialState = fromJS({
  available: new List(specs),
  selected: new List(checkedSpecs),
});

function configuratorReducer(state = configuratorInitialState, action) {
  switch (action.type) {
    case reportActions.REPORT_SELECTED_ADD:
      return state.updateIn(['selected'], selected =>
        selected.push(action.index)
      );

    case reportActions.REPORT_SELECTED_REMOVE:
      return state.updateIn(['selected'], selected =>
        selected.delete(action.index)
      );

    default:
      return state;
  }
}

export default configuratorReducer;

export const getAvailableReports = state =>
  state.get('available');

export const getAvailableReportIndex = (state, value) =>
  state
  .get('available')
  .findKey((field) => (
    field.name === value
  ));

export const getSelectedReports = state =>
  state.get('selected');

export const getSelectedReportIndex = (state, value) =>
  state.get('selected').indexOf(value);
