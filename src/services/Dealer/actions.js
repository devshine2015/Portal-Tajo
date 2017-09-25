import { getSessionData } from 'services/Session/reducer';

export const DEALER_PORTAL_READY = 'dealer portal set ready state';
export const DEALER_PORTAL_FLEET_READY_STATE_SET = 'change dealer portal fleet data ready state';
export const DEALER_PORTAL_FLEET_SET = 'dealer portal set current fleet';

export const initDealerPortal = isReady => (dispatch, getState) => {
  const profile = getSessionData(getState());
  const fleets = profile.getIn(['app_metadata', 'subfleets']);

  dispatch({
    type: DEALER_PORTAL_READY,
    isReady,
    fleets,
  });
};

export const changeFleet = (/* nextFleetName */) => (dispatch) => {
  dispatch({
    type: DEALER_PORTAL_FLEET_READY_STATE_SET,
    readyState: 'loading',
  });
};

