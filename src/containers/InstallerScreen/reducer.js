import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { loaderActions, formActions } from './actions';

const loaderInitialState = fromJS({
  isLoading: false,
});
const formInitialState = fromJS({
  submittedSuccessfully: false,
});

function loaderReducer(state = loaderInitialState, action) {
  switch (action.type) {
    case loaderActions.INSTALLER_LOADER_STATE_SET: {
      return state.set('isLoading', action.nextState);
    }
    default:
      return state;
  }
}

function formReducer(state = formInitialState, action) {
  switch (action.type) {
    case formActions.INSTALLER_FORM_SUBMIT_SUCCESS: {
      return state.set('submittedSuccessfully', true);
    }
    case formActions.INSTALLER_FORM_SUBMIT_RESET: {
      return state.set('submittedSuccessfully', false);
    }
    default:
      return state;
  }
}

export default combineReducers({
  form: formReducer,
  loader: loaderReducer,
});

export const getLoaderState = (state) =>
  state.getIn(['installer', 'loader', 'isLoading']);
export const getFormSubmissionState = (state) =>
  state.getIn(['installer', 'form', 'submittedSuccessfully']);
