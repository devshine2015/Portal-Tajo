import { fromJS } from 'immutable';
import { USERS_MANAGER_READY_STATE_CHANGE } from '../actions';

const initialState = fromJS({
  isReady: 'not ready',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_MANAGER_READY_STATE_CHANGE:
      return state.set('isReady', action.nextState);

    default:
      return state;
  }
}

export const reducerKey = 'ready state';
