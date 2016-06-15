import { fromJS, List } from 'immutable';
import {
  OFFLINE_STORAGE_SAVE_DATA,
} from './actions';

const initialState = fromJS({
  hasOfflineData: false,
  data: new List(),
});

export default function offlineDataReducer(state = initialState, action) {
  switch (action.type) {
    case OFFLINE_STORAGE_SAVE_DATA: {
      let nextState = state;

      if (action.hasOwnProperty('data')) {
        // push data is it's a object
        if (action.data && !action.data.hasOwnProperty('length')) {
          nextState = nextState.update('data', list => list.push(action.data));
        } else if (action.data && action.data.hasOwnProperty('length')) {
          nextState = nextState.set('data', new List(action.data));
        } else if (action.data === undefined) {
          nextState = nextState.set('data', new List());
        }
      }

      const hasData = nextState.get('data').size !== 0;
      nextState = nextState.set('hasOfflineData', hasData);

      return nextState;
    }
    default:
      return state;
  }
}
