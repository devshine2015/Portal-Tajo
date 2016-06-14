import {
  FORM_SET_LOADER_STATE,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_RESET,
} from './actions';

const initialState = {
  isLoading: false,
  submittedSuccessfully: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case FORM_SET_LOADER_STATE: {
      return Object.assign({}, state, {
        isLoading: action.nextState,
      });
    }
    case FORM_SUBMIT_SUCCESS: {
      return Object.assign({}, state, {
        submittedSuccessfully: true,
      });
    }
    case FORM_SUBMIT_RESET: {
      return Object.assign({}, state, {
        submittedSuccessfully: initialState.submittedSuccessfully,
      });
    }
    default:
      return state;
  }
}
