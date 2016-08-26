import { getFleetName } from '../reducer';
import { dataActions } from 'containers/Report/actions';

export const GLOBAL_FLEET_NAME_SET = 'portal/App/GLOBAL_FLEET_NAME_SET';

export const setFleet = (nextFleetName) => (dispatch, getState) => {
  const prevFleetName = getFleetName(getState());

  dispatch(_setFleetName(nextFleetName));

  if (prevFleetName && (prevFleetName !== nextFleetName)) {
    _swipeFleetRelatedData(dispatch);
  }

  return Promise.resolve();
};

function _swipeFleetRelatedData(dispatch) {
  dispatch(dataActions.removeReportData());
}

const _setFleetName = (fleetName) => ({
  type: GLOBAL_FLEET_NAME_SET,
  fleetName,
});
