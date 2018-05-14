import { combineReducers } from 'redux-immutable';
import { List } from 'immutable';
import { INNER_PORTAL_PAGES_SET, TOGGLE_VEHICLE_PANEL, SELECT_OVERVIEW_VEHICLE } from './actions';

const pagesInitialState = new List();
const demoInitialState = {
  isVehiclesPanelOpen: false,
  selectedOverviewVehicle: null,
};

function pagesReducer(state = pagesInitialState, action) {
  switch (action.type) {
    case INNER_PORTAL_PAGES_SET:
      return new List(action.pages);
    default:
      return state;
  }
}

function demoReducer(state = demoInitialState, action) {
  switch (action.type) {
    case TOGGLE_VEHICLE_PANEL:
      return {
        ...state,
        isVehiclesPanelOpen: !state.isVehiclesPanelOpen,
      };
    case SELECT_OVERVIEW_VEHICLE:
      return {
        ...state,
        selectedOverviewVehicle: action.id,
      };
    default:
      return state;
  }
}

export default combineReducers({
  pages: pagesReducer,
  demo: demoReducer,
});

export const getDashboardPages = state =>
  state.getIn(['inner', 'pages']);
