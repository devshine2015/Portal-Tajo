import { fromJS } from 'immutable';
import { loginActions, commonActions } from 'services/Auth/actions';
import {
  ALRT_TYPES_SET,
  ALRT_CONDITON_ADD,
  ALRT_EVEENTS_ADD,
} from './actions';

const initialState = fromJS({
  types: [],
  conditions: [],
  events: [], // what happened, pulling this periodicaly from backEnd
// });

function alertsReducer(state = initialState, action) {
  switch (action.type) {
    // case USER_SET:
    // case loginActions.LOGIN_SUCCESS:
    //   return state.merge({ ...action.userData });
    default:
      return state;
  }
}

export default alertsReducer;

export const getAlertsTypes = state =>
  state.get('types').toJS();
