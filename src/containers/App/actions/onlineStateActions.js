// import { checkStorage } from 'containers/OfflineData/actions';

export const GLOBAL_ONLINE_STATE_CHANGE = 'portal/App/GLOBAL_ONLINE_STATE_CHANGE';

// export const changeOnlineState = (onLine) => (dispatch) =>
//   _changeOnlineState(onLine, dispatch);
export const changeOnlineState = (onLine) => ({
  type: GLOBAL_ONLINE_STATE_CHANGE,
  onLine,
});

// function _changeOnlineState(onLine, dispatch) {
//   if (onLine) {
//     checkStorage(dispatch);
//   }

//   dispatch(_performOnlineStateChange(onLine));
// }
