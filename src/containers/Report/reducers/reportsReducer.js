import { fromJS, List } from 'immutable';
import { reportActions } from '../actions';
import tempSpecs from '../specs/temperature';
import baseSpecs from '../specs/base';
import mileageSpecs from '../specs/mileage';
import mwaJobs from '../specs/mwaJobs';
import mwaJobsTime from '../specs/mwaJobsTime';
// import idlingSpecs from '../specs/idling';
import statsSpecs from '../specs/stats';
import { isMwa } from 'configs';

// join arrays and filter for available ones
const specs = baseSpecs
  .concat( mileageSpecs, tempSpecs, statsSpecs)
  .filter(spec =>
    !spec.hasOwnProperty('available') || spec.available
  );
const specsMWA = baseSpecs
  .concat( mwaJobs, mwaJobsTime, mileageSpecs, tempSpecs, statsSpecs)
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
    case reportActions.REPORT_SET_MWA:
      return state.set('available', new List(specsMWA));
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
