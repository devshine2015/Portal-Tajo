import { combineReducers } from 'redux-immutable';
import { fromJS, List } from 'immutable';
import { INNER_PORTAL_PAGES_SET, INNER_PORTAL_SIDEBAR_CHANGE } from './actions';

const sidebarInitialState = fromJS({
  opened: false,
});
const pagesInitialState = new List();

function sidebarReducer(state = sidebarInitialState, action) {
  switch (action.type) {
    case INNER_PORTAL_SIDEBAR_CHANGE: {
      const isOpened = state.get('opened');
      const nextState = !isOpened;

      return state.set('opened', nextState);
    }
    default:
      return state;
  }
}

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
  sidebar: sidebarReducer,
});

export const getDashboardPages = (state) =>
  state.getIn(['inner', 'pages']);
export const getSidebarState = (state) =>
  state.getIn(['inner', 'sidebar', 'opened']);
