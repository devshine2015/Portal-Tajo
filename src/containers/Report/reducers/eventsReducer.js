import { fromJS, List } from 'immutable';
import { eventActions, reportVehiclesActions } from '../actions';
import { fields } from '../specs/events';

const initialState = fromJS({
  available: new List(fields),
  selected: new List(),
  tooManyVehiclesSelected: true,
  forced: false,
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

    case reportVehiclesActions.VEHICLE_ADD:
      return state.set('tooManyVehiclesSelected', action.selectedTooMuch);

    case reportVehiclesActions.VEHICLE_REMOVE:
      return state.set('tooManyVehiclesSelected', action.selectedTooMuch);

    case eventActions.EVENT_ALLOW_PICK_MORE:
      return state.withMutations(s => {
        s.set('tooManyVehiclesSelected', !action.allow)
         .set('forced', action.forced);
      });

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

export const getIsTooManyVehiclesSelected = state =>
  state.get('tooManyVehiclesSelected');

export const getIsForced = state =>
  state.get('forced');
