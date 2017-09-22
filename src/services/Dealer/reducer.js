import { fromJS/* , List */ } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
// import {
//   FETCH_DEALER_VEHICLES_SUCCESS,
//   FETCH_DEALER_VEHICLES_FAILURE,
// } from './actions';

const initialState = fromJS({
  // vehiclesMap: null,
  // vehiclesList: null,
  isReady: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    // case FETCH_DEALER_VEHICLES_FAILURE:
    case SESSION_CLEAN:
      return initialState;

    // case FETCH_DEALER_VEHICLES_SUCCESS:
    //   return state.withMutations((st) => {
    //     st.set('vehiclesMap', fromJS(action.map))
    //       .set('vehiclesList', List(action.list))
    //       .set('isReady', true);
    //   });

    default:
      return state;
  }
}

export default reducer;

export const reducerKey = 'Dealer';
