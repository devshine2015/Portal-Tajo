export const CTX_MAP_STOREVIEW = 'ctx/map/storeView';
export const CTX_HIDE_GF = 'ctx/hideGf';
export const CTX_HIDE_VEH = 'ctx/hideVeh';

export const ctxStoreMap = (center, zoom) => (dispatch) =>
  dispatch({
    type: CTX_MAP_STOREVIEW,
    center,
    zoom,
  });

export const ctxHideGF = (doHide) => (dispatch) =>
  dispatch({
    type: CTX_HIDE_GF,
    doHide,
  });

export const ctxHideVehicles = (doHide) => (dispatch) =>
  dispatch({
    type: CTX_HIDE_VEH,
    doHide,
  });
