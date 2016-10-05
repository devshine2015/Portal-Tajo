import { getSelectedFieldIndex, getAvailableFieldIndex } from '../reducer';

export const CONFIGURATOR_REPORTS_SELECTED_ADD = 'portal/Report/CONFIGURATOR_REPORTS_SELECTED_ADD';
export const CONFIGURATOR_REPORTS_SELECTED_REMOVE = 'portal/Report/CONFIGURATOR_REPORTS_SELECTED_REMOVE';
export const CONFIGURATOR_ERROR_SET = 'portal/Report/CONFIGURATOR_ERROR_SET';

export const updateSelectedReportTypes = params => (dispatch, getState) =>
  _updateSelectedReportTypes(params, dispatch, getState);
export const setErrorMessage = message => ({
  type: CONFIGURATOR_ERROR_SET,
  message,
});

function _updateSelectedReportTypes({ field, value, index }, dispatch, getState) {
  const selectedFieldIndex = getSelectedFieldIndex(getState(), index);

  // add selected field if its value is true
  // and if state doesn't have such field yet;
  if (value && selectedFieldIndex === -1) {
    const availableFieldIndex = getAvailableFieldIndex(getState(), field);

    dispatch(_addSelectedReport(availableFieldIndex));
  } else {
    dispatch(_removeSelectedReport(selectedFieldIndex));
  }

  return Promise.resolve();
}

const _addSelectedReport = index => ({
  type: CONFIGURATOR_REPORTS_SELECTED_ADD,
  index,
});

const _removeSelectedReport = index => ({
  type: CONFIGURATOR_REPORTS_SELECTED_REMOVE,
  index,
});
