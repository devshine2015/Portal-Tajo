export const SERVICE_FLEET_MODEL_SET = 'portal/FleetModel/SERVICE_FLEET_MODEL_SET';

const backendData = {
  F8DUFD8UFD8: {
    name: 'lol',
  },
  askdjaskjd22: {
    name: 'ololo',
  },
};

export const getFleet = (fleet = 'test') => ({
  type: SERVICE_FLEET_MODEL_SET,
  fleet,
  backendData,
});
