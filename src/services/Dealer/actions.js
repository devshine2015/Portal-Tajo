import { api } from 'utils/api';
// import { getSessionData } from 'services/Session/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import {
  conditionsActions,
} from 'services/AlertsSystem/actions';
import { isDealer } from 'configs';

export const DEALER_PORTAL_READY = 'dealer portal set ready state';
export const DEALER_PORTAL_FLEET_READY_STATE_SET = 'change dealer portal fleet data ready state';
export const DEALER_PORTAL_SELECT_FLEET = 'dlrSelectSubFleet';
export const DEALER_PORTAL_SELECT_TIME_RANGE = 'dlrSelectTimeRange';

// export const initDealerPortal = isReady => (dispatch, getState) => {
//   const profile = getSessionData(getState());
//   const fleets = profile.getIn(['app_metadata', 'subfleets']);

//   dispatch({
//     type: DEALER_PORTAL_READY,
//     isReady,
//     fleets,
//   });
// };

export const initDealerPortal = (isReady, subFleets) => (dispatch) => {
  dispatch({
    type: DEALER_PORTAL_READY,
    isReady,
    fleets: subFleets,
    selectedFleet: '',
    selectedTimeRange: {},
  });
};

export const changeFleet = nextFleetName => (dispatch, getState) => {
  if (isDealer) {
    // setSubFleet 
    dispatch(setSubFleet(nextFleetName));
  } else {
    api.setFleet(nextFleetName);
  }

  dispatch(fleetReadyStateChange('loading'));

  dispatch(vehiclesActions.fetchVehicles(getState))
    .then(() => {
      dispatch(fleetReadyStateChange('ready'));
    }, () => {
      dispatch(fleetReadyStateChange('error'));
    })
    .then(() => dispatch(conditionsActions.fetchAlertConditions()))
    .then(() => dispatch(conditionsActions.fetchAllVehicleAlerts(getState)));
  // .then(() => dispatch(journalActions.fetchNotifications(makePeriodForLast24Hours())))
  // .then(() => dispatch(fetchDevices()));
};

const fleetReadyStateChange = nextState => ({
  type: DEALER_PORTAL_FLEET_READY_STATE_SET,
  readyState: nextState,
});

const setSubFleet = nextFleetName => ({
  type: DEALER_PORTAL_SELECT_FLEET,
  selectedFleet: nextFleetName,
});

export const changeTimeRange = data => ({
  type: DEALER_PORTAL_SELECT_TIME_RANGE,
  selectedTimeRange: data,
});
