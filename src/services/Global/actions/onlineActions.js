export const GLOBAL_ONLINE_STATE_CHANGE = 'portal/services/GLOBAL_ONLINE_STATE_CHANGE';

export const changeOnlineState = (onLine) => ({
  type: GLOBAL_ONLINE_STATE_CHANGE,
  onLine,
});
