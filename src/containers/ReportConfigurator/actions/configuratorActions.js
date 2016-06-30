import { getSelectedFieldIndex, getAvailableFieldIndex } from '../reducer';

export const REPORT_CONFIGURATOR_SELECTED_ADD = 'portal/ReportConfigurator/REPORT_CONFIGURATOR_SELECTED_ADD';
export const REPORT_CONFIGURATOR_SELECTED_REMOVE = 'portal/ReportConfigurator/REPORT_CONFIGURATOR_SELECTED_REMOVE';
export const REPORT_CONFIGURATOR_FREQUENCY_CHANGE = 'portal/ReportConfigurator/REPORT_CONFIGURATOR_FREQUENCY_CHANGE';

export const updateSelected = (field) => (dispatch, getState) =>
  _updateSelected(field, dispatch, getState);
export const changeFrequency = (nextState) => ({
  type: REPORT_CONFIGURATOR_FREQUENCY_CHANGE,
  nextState,
});

function _updateSelected({ field, value, index }, dispatch, getState) {
  const selectedFieldIndex = getSelectedFieldIndex(getState(), index);

  // add selected field if its value is true
  // and if state doesn't have such field yet;
  if (value && selectedFieldIndex === -1) {
    const availableFieldIndex = getAvailableFieldIndex(getState(), field);

    dispatch(_addSelected(availableFieldIndex));
  } else {
    dispatch(_removeSelected(selectedFieldIndex));
  }

  return Promise.resolve();
}

const _addSelected = (index) => ({
  type: REPORT_CONFIGURATOR_SELECTED_ADD,
  index,
});

const _removeSelected = (index) => ({
  type: REPORT_CONFIGURATOR_SELECTED_REMOVE,
  index,
});
