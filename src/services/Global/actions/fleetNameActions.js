// need to do something with that
import { dataActions } from 'containers/Report/actions';
import { getFleetName } from '../reducer';

export const GLOBAL_FLEET_NAME_SET = 'portal/services/GLOBAL_FLEET_NAME_SET';

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
