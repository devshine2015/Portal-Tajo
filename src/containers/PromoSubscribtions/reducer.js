import { fromJS } from 'immutable' ;
import {
  PROMO_DATA_UPDATE,
  PROMO_FIREBASE_INITIATED,
} from './actions';

const initialState = fromJS({
  firebaseInitiated: false,
  data: {},
});

export default function promoTrackingScreen(state = initialState, action) {
  switch (action.type) {
    case PROMO_DATA_UPDATE: {
      return state.set('data', action.data);
    }
    case PROMO_FIREBASE_INITIATED: {
      return state.set('firebaseInitiated', action.initiated);
    }
    default:
      return state;
  }
}

export const getPromoData = (state) =>
  state.getIn(['promos', 'data']);
export const getFirebaseStatus = (state) =>
  state.getIn(['promos', 'firebaseInitiated']);
