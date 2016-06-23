import { combineReducers } from 'redux-immutable';
import { fromJS, List } from 'immutable';
import { sidebarActions, pagesActions } from './actions';

const pagesInitialState = new List();

const sidebarInitialState = fromJS({
  opened: false,
});

function pagesReducer(state = pagesInitialState, action) {
  switch (action.type) {
    case pagesActions.DASHBOARD_PAGES_SET:
      return new List(action.pages);
    default:
      return state;
  }
}

function sidebarReducer(state = sidebarInitialState, action) {
  switch (action.type) {
    case sidebarActions.DASHBOARD_SIDEBAR_CHANGE: {
      const isOpened = state.get('opened');
      const nextState = !isOpened;

      return state.set('opened', nextState);
    }
    default:
      return state;
  }
}

export default combineReducers({
  pages: pagesReducer,
  sidebar: sidebarReducer,
});

export const getSidebarState = (state) =>
  state.getIn(['dashboard', 'sidebar', 'opened']);
export const getDashboardPages = (state) =>
  state.getIn(['dashboard', 'pages']);
