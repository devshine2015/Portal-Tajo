import { getSelectedFieldIndex, getAvailableFieldIndex } from '../reducer';

export const REPORT_CONFIGURATOR_SELECTED_ADD = 'portal/ReportConfigurator/REPORT_CONFIGURATOR_SELECTED_ADD';
export const REPORT_CONFIGURATOR_SELECTED_REMOVE = 'portal/ReportConfigurator/REPORT_CONFIGURATOR_SELECTED_REMOVE';

export const updateSelected = (field) => (dispatch, getState) =>
  _updateSelected(field, dispatch, getState);

function _updateSelected({ field, value }, dispatch, getState) {
  const selectedFieldIndex = getSelectedFieldIndex(getState(), field);

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
