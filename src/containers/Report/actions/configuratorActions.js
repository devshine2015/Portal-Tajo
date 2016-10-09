import { getSelectedFieldIndex, getAvailableFieldIndex } from '../reducer';

export const CONFIGURATOR_SELECTED_ADD = 'portal/Report/CONFIGURATOR_SELECTED_ADD';
export const CONFIGURATOR_SELECTED_REMOVE = 'portal/Report/CONFIGURATOR_SELECTED_REMOVE';
export const CONFIGURATOR_FREQUENCY_CHANGE = 'portal/Report/CONFIGURATOR_FREQUENCY_CHANGE';
export const CONFIGURATOR_ERROR_SET = 'portal/Report/CONFIGURATOR_ERROR_SET';


export const updateSelected = (field) => (dispatch, getState) =>
  _updateSelected(field, dispatch, getState);
export const changeFrequency = (nextState) => ({
  type: CONFIGURATOR_FREQUENCY_CHANGE,
  nextState,
});
export const setErrorMessage = (message) => ({
  type: CONFIGURATOR_ERROR_SET,
  message,
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
  type: CONFIGURATOR_SELECTED_ADD,
  index,
});

const _removeSelected = (index) => ({
  type: CONFIGURATOR_SELECTED_REMOVE,
  index,
});
