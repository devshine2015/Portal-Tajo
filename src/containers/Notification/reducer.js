import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
} from './actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  show: false,
});

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW: {
      const nextState = state.set('show', true);

      return nextState;
    }
    case NOTIFICATION_HIDE: {
      const nextState = state.set('show', false);

      return nextState;
    }
    default:
      return state;
  }
}
