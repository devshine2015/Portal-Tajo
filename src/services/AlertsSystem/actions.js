import { makeLocalAlertCondition } from './alertConditionHelper';

export const ALRT_TYPES_SET = 'alrt/typesSet';
export const ALRT_CONDITON_ADD = 'alrt/conditionAdd';
export const ALRT_EVEENTS_ADD = 'alrt/eventsAdd';

export const fetchAlertConditions = () => (dispatch) => {
  dispatch(_conditionAdd(makeLocalAlertCondition('0001', 'Temperature MedRange')));
  dispatch(_conditionAdd(makeLocalAlertCondition('0002', 'Temperature SubZero')));
  dispatch(_conditionAdd(makeLocalAlertCondition('0003', 'Speed Low')));
  dispatch(_conditionAdd(makeLocalAlertCondition('0004', 'Speed High')));
  dispatch(_conditionAdd(makeLocalAlertCondition('0005', 'Left Warehause')));
  dispatch(_conditionAdd(makeLocalAlertCondition('0006', 'Enter PortArea')));
};

// export const addAlertCondition = (alertObj) => dispatch => {
//   dispatch(_conditionAdd(alertObj));
// };

const _conditionAdd = (alertObj) => ({
  type: ALRT_CONDITON_ADD,
  alertObj,
});
