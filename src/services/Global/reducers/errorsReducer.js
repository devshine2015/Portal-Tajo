import { fromJS } from 'immutable';
import { errorsActions } from '../actions';

const initialState = fromJS({
  type: '',
});

function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case errorsActions.GLOBAL_ERROR_SET:
      return fromJS(action.error);

    case errorsActions.GLOBAL_ERROR_RESET:
      return initialState;

    default:
      return state;
  }
}

export default errorsReducer;

export const getErrorType = state =>
  state.get('type');

export const getError = state => state;
