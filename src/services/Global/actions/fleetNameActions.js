export const GLOBAL_FLEET_NAME_SET = 'portal/services/GLOBAL_FLEET_NAME_SET';

export const setFleet = nextFleetName => dispatch => {
  dispatch(_setFleetName(nextFleetName));

  return Promise.resolve();
};

const _setFleetName = (fleetName) => ({
  type: GLOBAL_FLEET_NAME_SET,
  fleetName,
});
