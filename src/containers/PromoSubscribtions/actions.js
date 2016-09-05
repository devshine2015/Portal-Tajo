require('firebase/database');
import firebase from 'firebase/app';
import { FIREBASE_CONFIG } from 'utils/constants';
import { FIREBASE_SUBSCRIBTIONS_REF } from './constants';
import { getFirebaseStatus } from './reducer';

let database;
let SUBSCRIBTION_REF;

export const PROMO_DATA_UPDATE = 'portal/PromoTrackingScreen/PROMO_DATA_UPDATE';
export const PROMO_FIREBASE_INITIATED = 'portal/PromoTrackingScreen/PROMO_FIREBASE_INITIATED';

export const subscribeToData = () => (dispatch, getState) => {
  const firebaseInitiated = getFirebaseStatus(getState());

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
  type: PROMO_DATA_UPDATE,
  data,
});

const _setFirebaseInitiated = (initiated) => ({
  type: PROMO_FIREBASE_INITIATED,
  initiated,
});
