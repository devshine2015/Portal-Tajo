// import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { CHRONICLE_SET_T, CHRONICLE_SET_TIMEFRAME } from './actions';

const chronicleInitialState = fromJS({
  normalized100T: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
});

export default function chronicleReducer(state = chronicleInitialState, action) {
  switch (action.type) {
    case CHRONICLE_SET_T:
      return state.set('normalized100T', action.normalized100T);
    case CHRONICLE_SET_TIMEFRAME:
      return state.set('dateFrom', (action.dateFrom))
          .set('dateTo', (action.dateTo));
    default:
      return state;
  }
}

export const getNormalized100T = (state) =>
  state.getIn(['chronicle', 'normalized100T']);

export const getChronicleTimeFrame = (state) => {
  return {
    fromDate: state.getIn(['chronicle', 'dateFrom']),
    toDate: state.getIn(['chronicle', 'dateTo']),
  };
};

// export const getChronicleTimeFrame = (state) => ({
//   fromDate: state.getIn(['chronicle', 'dateFrom']).toJS(),
//   toDate: state.getIn(['chronicle', 'dateTo']).toJS(),
// });
