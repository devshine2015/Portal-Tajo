// import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { GF_EDIT } from './actions';

const chronicleInitialState = fromJS({
  editSubject: null,  // existing GF we are editing now, local only when creating new
});

export default function gfEditorReducer(state = chronicleInitialState, action) {
  switch (action.type) {
    case GF_EDIT:
      return state.set('editSubject', fromJS(action.subjectGF));
    default:
      return state;
  }
}

export const gfEditGetSubject = (state) => {
  const imObj = state.getIn(['gfEditor', 'editSubject']);
  if (imObj === null) {
    return null;
  }
  return imObj.toJS();
};

export const gfEditIsEditing = (state) =>
  (state.getIn(['gfEditor', 'editSubject']) !== null);
