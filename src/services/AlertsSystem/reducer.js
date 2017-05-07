import { combineReducers } from 'redux-immutable';
import R from 'ramda';
import conditionsReducer, * as fromConditionsReducer from './reducers/conditionsReducer';

export default combineReducers({
  conditions: conditionsReducer,
});

const getConditionsSlice = state => state.getIn(['alerts', 'conditions']);

export const getAlertConditions = state =>
  R.compose(fromConditionsReducer.getAlertConditions, getConditionsSlice)(state);

export const getAlertConditionByIdFunc = state =>
  R.compose(fromConditionsReducer.getAlertConditionByIdFunc, getConditionsSlice)(state);

export const getVehicleAlertConditions = state =>
  R.compose(fromConditionsReducer.getVehicleAlertConditions, getConditionsSlice)(state);
