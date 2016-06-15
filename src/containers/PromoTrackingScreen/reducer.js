import { fromJS } from 'immutable' ;
import {
  PROMO_TRACKING_UPDATE_DATA,
  PROMO_TRACKING_FIREBASE_INITIATED,
} from './actions';

const initialState = fromJS({
  firebaseInitiated: false,
  data: {},
});

export default function promoTrackingScreen(state = initialState, action) {
  switch (action.type) {
    case PROMO_TRACKING_UPDATE_DATA: {
      return state.set('data', action.data);
    }
    case PROMO_TRACKING_FIREBASE_INITIATED: {
      return state.set('firebaseInitiated', action.initiated);
    }
    default:
      return state;
  }
}
