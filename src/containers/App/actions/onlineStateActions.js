export const GLOBAL_ONLINE_STATE_CHANGE = 'portal/App/GLOBAL_ONLINE_STATE_CHANGE';

export const changeOnlineState = (onLine) => ({
  type: GLOBAL_ONLINE_STATE_CHANGE,
  onLine,
});
