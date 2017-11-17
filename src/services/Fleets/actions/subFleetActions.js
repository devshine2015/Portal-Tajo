import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { initDealerPortal } from 'services/Dealer/actions';

// import { hasFullScreenBoard } from 'configs';

// export const ALRT_CONDITIONS_READY_SET = 'alrtSys/ALRT_CONDITIONS_READY_SET';

export const createSubFleet = newFleets => (dispatch, getState) =>
  _postSubFleets(newFleets, dispatch, getState);

export const fetchSubFleets = () => (dispatch) => {
  const { url, method } = endpoints.getSubFleets;
  // const state = getState();
  // dispatch(_conditionsReadySet(false));

  return api[method](url)
    .then(toJson)
    .then((subFleets) => {
      dispatch(initDealerPortal(true, subFleets.map(aFltMeta => aFltMeta.name)));
    });
  // .then((conditions) => {
  //   _setConditions(dispatch, state, conditions);
  // })
  // .catch((e) => {
  //   console.error(e);
  //   dispatch(_conditionsReadySet(true));
  // });
};

function _postSubFleets(newFleets, dispatch, getState) {
  const { url, method } = endpoints.createSubFleet;

  return api[method](url, {
    payload: newFleets,
  })
  // TODO: temporary logic - GF alert conditions should be added
  // on BeckEnd automatically
  // --->>> REMOVE THIS when implemented on BE side
    .then(res => res.json())
    .then((res) => {
      console.log(` +++  SUBfLEETS   ${res}`);
      // if (gfObj.kind === 'poly') {
      //   createAlertConditions([
      //     makeGFAlertConditionBackEndObject(gfObj, true),
      //     makeGFAlertConditionBackEndObject(gfObj, false),
      //   ])(dispatch, getState);
      // }
    });
  // ---<<< REMOVE THIS over
  //   .then(() => {
  // // TODO: no need to fetch all - just add the new one to the sore?
  //     _fetchGFs(dispatch, getState);
  //     return Promise.resolve();
  //   }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}

/**
 * POST - new Alerts details to the server
 * */

// const _conditionDelete = alertId => ({
//   type: ALRT_CONDITON_DEL,
//   alertId,
// });

// const _conditionSet = conditions => ({
//   type: ALRT_CONDITONS_SET,
//   conditions,
// });

// const _vehicleConditionsSet = (vehicleId, conditions) => ({
//   type: ALRT_VEHICLE_SET,
//   vehicleId,
//   conditions,
// });

// const _conditionsReadySet = isReady => ({
//   type: ALRT_CONDITIONS_READY_SET,
//   isReady,
// });
