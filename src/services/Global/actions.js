import { getFleetName } from './reducer';
// need to do something with that
import { dataActions } from 'containers/Report/actions';

export const GLOBAL_FLEET_NAME_SET = 'portal/services/GLOBAL_FLEET_NAME_SET';
export const GLOBAL_ONLINE_STATE_CHANGE = 'portal/App/GLOBAL_ONLINE_STATE_CHANGE';

export const changeOnlineState = (onLine) => ({
  type: GLOBAL_ONLINE_STATE_CHANGE,
  onLine,
});

export const setFleet = (nextFleetName) => (dispatch, getState) => {
  const prevFleetName = getFleetName(getState());

  dispatch(_setFleetName(nextFleetName));

  if (prevFleetName && (prevFleetName !== nextFleetName)) {
    _swipeFleetRelatedData(dispatch);
  }

  return Promise.resolve();
};

// find the way to swipe data from another place
function _swipeFleetRelatedData(dispatch) {
  dispatch(dataActions.removeReportData());
}

const _setFleetName = (fleetName) => ({
  type: GLOBAL_FLEET_NAME_SET,
  fleetName,
});
