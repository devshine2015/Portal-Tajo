export const GLOBAL_FLEET_NAME_SET = 'portal/App/GLOBAL_FLEET_NAME_SET';

export const setFleetName = (fleet) => ({
  type: GLOBAL_FLEET_NAME_SET,
  fleet,
});
