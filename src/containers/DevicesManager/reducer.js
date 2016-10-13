import { fromJS } from 'immutable';

const initialState = fromJS({
  isEditing: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;

export const getIsEditing = state =>
  state.getIn(['devicesManager, isEditing']);
