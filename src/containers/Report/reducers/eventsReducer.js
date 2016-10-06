import { fromJS, List } from 'immutable';
import { eventActions } from '../actions';
import { fields } from '../specs/events';

const initialState = fromJS({
  available: new List(fields),
  selected: new List(),
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case eventActions.EVENT_SELECTED_ADD:
      return state.updateIn(['selected'], selected =>
        selected.push(action.index)
      );

    case eventActions.EVENT_SELECTED_REMOVE:
      return state.updateIn(['selected'], selected =>
        selected.delete(action.index)
      );

    default:
      return state;
  }
}

export default reducer;

export const getAvailableEvents = state =>
  state.get('available');

export const getAvailableEventIndex = (state, value) =>
  state
  .get('available')
  .findKey((field) => (
    field.name === value
  ));

export const getSelectedEvents = state =>
  state.get('selected');

export const getSelectedEventIndex = (state, value) =>
  state.get('selected').indexOf(value);
