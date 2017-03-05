import { _dev_makeLocalAlertCondition } from './alertConditionHelper';

export const ALRT_TYPES_SET = 'alrt/typesSet';
export const ALRT_CONDITON_ADD = 'alrt/conditionAdd';
export const ALRT_EVEENTS_ADD = 'alrt/eventsAdd';

export const fetchAlertConditions = () => (dispatch) => {
  dispatch(_conditionAdd(_dev_makeLocalAlertCondition('0001', 'Temperature MedRange', 'TEMPERATURE')));
  dispatch(_conditionAdd(_dev_makeLocalAlertCondition('0002', 'Temperature SubZero', 'TEMPERATURE')));
  dispatch(_conditionAdd(_dev_makeLocalAlertCondition('0003', 'Speed Low', 'SPEED')));
  dispatch(_conditionAdd(_dev_makeLocalAlertCondition('0004', 'Speed High', 'SPEED')));
  dispatch(_conditionAdd(_dev_makeLocalAlertCondition('0005', 'Left Warehause', 'EXIT_GF')));
  dispatch(_conditionAdd(_dev_makeLocalAlertCondition('0006', 'Enter PortArea', 'ENTER_GF')));
};

// export const addAlertCondition = (alertObj) => dispatch => {
//   dispatch(_conditionAdd(alertObj));
// };

const _conditionAdd = (alertObj) => ({
  type: ALRT_CONDITON_ADD,
  alertObj,
});
