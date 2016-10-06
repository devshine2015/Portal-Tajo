import { addSelectedReport, removeSelectedReport } from './reportActions';
import { addSelectedEvent, removeSelectedEvent } from './eventActions';
import {
  getSelectedReportIndex,
  getAvailableReportIndex,
  getSelectedEventIndex,
  getAvailableEventIndex,
} from '../reducer';

export const CONFIGURATOR_ERROR_SET = 'portal/Report/CONFIGURATOR_ERROR_SET';

export const updateSelectedTypes = params => (dispatch, getState) =>
  _updateSelectedTypes(params, dispatch, getState);
export const setErrorMessage = message => ({
  type: CONFIGURATOR_ERROR_SET,
  message,
});

function _updateSelectedTypes({ field, value, index, source }, dispatch, getState) {
  let selectedIndex;
  let getAvailableIndex;
  let addSelected;
  let removeSelected;

  if (source === 'reports') {
    selectedIndex = getSelectedReportIndex(getState(), index);
    getAvailableIndex = getAvailableReportIndex;
    addSelected = addSelectedReport;
    removeSelected = removeSelectedReport;
  } else if (source === 'events') {
    selectedIndex = getSelectedEventIndex(getState(), index);
    getAvailableIndex = getAvailableEventIndex;
    addSelected = addSelectedEvent;
    removeSelected = removeSelectedEvent;
  }

  // add selected field if its value is true
  // and if state doesn't have such field yet;
  if (value && selectedIndex === -1) {
    const availableFieldIndex = getAvailableIndex(getState(), field);

    dispatch(addSelected(availableFieldIndex));
  } else {
    dispatch(removeSelected(selectedIndex));
  }

  return Promise.resolve();
}
