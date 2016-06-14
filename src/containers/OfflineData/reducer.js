import { fromJS, List } from 'immutable';
import {
  OFFLINE_STORAGE_SAVE_DATA,
} from './actions';

const initialState = fromJS({
  hasOfflineData: false,
  data: List(),
});

export default function offlineDataReducer(state = initialState, action) {
  switch (action.type) {
    case OFFLINE_STORAGE_SAVE_DATA: {
      let nextState = state;

      if (action.hasOwnProperty('data')) {

        // push if data is not an array
        if (!action.data.hasOwnProperty('length')) {
          nextState = nextState.update('data', list => list.push(action.data));
        } else {
          nextState = nextState.set('data', List(action.data));
        }
      }

      const hasData = nextState.get('data').size !== 0;
      nextState = nextState.set('hasOfflineData', hasData)

      return nextState;
    }
    default:
      return state;
  }
}