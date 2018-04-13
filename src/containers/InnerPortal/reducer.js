import { combineReducers } from 'redux-immutable';
import { List } from 'immutable';
import { INNER_PORTAL_PAGES_SET } from './actions';

const pagesInitialState = new List();

function pagesReducer(state = pagesInitialState, action) {
  switch (action.type) {
    case INNER_PORTAL_PAGES_SET:
      return new List(action.pages);
    default:
      return state;
  }
}

export default combineReducers({
  pages: pagesReducer,
});

export const getDashboardPages = state =>
  state.getIn(['inner', 'pages']);
