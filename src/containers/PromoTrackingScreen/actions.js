import firebase from 'firebase/app';
import {
  FIREBASE_CONFIG,
  FIREBASE_SUBSCRIBTIONS_REF,
} from './constants';
require('firebase/database');

let database;
let SUBSCRIBTION_REF;

export const PROMO_TRACKING_UPDATE_DATA = 'portal/PromoTrackingScreen/PROMO_TRACKING_UPDATE_DATA';
export const PROMO_TRACKING_FIREBASE_INITIATED = 'portal/PromoTrackingScreen/PROMO_TRACKING_FIREBASE_INITIATED';

export const subscribeToData = () => (dispatch, getState) => {
  const firebaseInitiated = getState().getIn(['promos', 'firebaseInitiated']);

  if (!firebaseInitiated) {
    firebase.initializeApp(FIREBASE_CONFIG);
    database = firebase.database();
    SUBSCRIBTION_REF = database.ref(FIREBASE_SUBSCRIBTIONS_REF);
    dispatch(_setFirebaseInitiated(true));
    dispatch(getDataFromFirebase());
  }
};

export const getDataFromFirebase = () => (dispatch) => {
  SUBSCRIBTION_REF.once('value', snapshot => {
    const data = snapshot.val();
    dispatch(_updateData(data));
  });
};

const _updateData = (data) => ({
  type: PROMO_TRACKING_UPDATE_DATA,
  data,
});

const _setFirebaseInitiated = (initiated) => ({
  type: PROMO_TRACKING_FIREBASE_INITIATED,
  initiated,
});
