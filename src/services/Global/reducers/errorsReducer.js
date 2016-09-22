import { fromJS } from 'immutable';
import { errorsActions } from '../actions';

const initialState = fromJS({
  message: '',
});

function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case errorsActions.GLOBAL_ERROR_SET:
      return state.set('message', action.error.message);
    case errorsActions.GLOBAL_ERROR_RESET:
      return state.set('message', '');
    default:
      return state;
  }
}

export default errorsReducer;

export const getErrorMessage = state =>
  state.get('message');
