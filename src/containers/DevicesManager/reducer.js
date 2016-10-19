import { fromJS } from 'immutable';
import {
  creatorActions,
  filterActions,
  searchActions,
} from './actions';

const initialState = fromJS({
  isEditing: false,
  currentFilter: 'all',
  searchString: '',
});

function reducer(state = initialState, action) {
  switch (action.type) {

    case filterActions.DEVICES_MANAGER_FILTER:
      return state.set('currentFilter', action.filterType);

    case searchActions.DEVICES_MANAGER_SEARCH:
      return state.set('searchString', action.searchString);

    case searchActions.DEVICES_MANAGER_SEARCH_RESET:
      return state.set('searchString', initialState.searchString);

    case creatorActions.DEVICES_MANAGER_EDITOR_OPEN:
      return state.set('isEditing', true);

    case creatorActions.DEVICES_MANAGER_EDITOR_CLOSE:
      return state.set('isEditing', false);

    default:
      return state;
  }
}

export default reducer;

export const getIsEditing = state =>
  state.getIn(['devicesManager', 'isEditing']);

export const getCurrentFilter = state =>
  state.getIn(['devicesManager', 'currentFilter']);

export const getSearchString = state =>
  state.getIn(['devicesManager', 'searchString']);
