export const CTX_MAP_STOREVIEW = 'ctx/map/storeView';
export const CTX_HIDE_GF = 'ctx/hideGf';
export const CTX_HIDE_VEH = 'ctx/hideVeh';
export const CTX_PL_TAB = 'ctx/powListTab';
export const CTX_ROUTE = 'ctx/route';
export const CTX_NEAREST = 'ctx/nrst';

// TODO: this is quick hack for testing only
export const CTX_MENU_PG_IDX = 'ctx/pageIdx';
export const ctxSetPageIdx = (pageIdx) => (dispatch) => {
  dispatch({
    type: CTX_MENU_PG_IDX,
    pageIdx,
  });
};


export const mapRoute = (toLatLng) => (dispatch) =>
  dispatch({
    type: CTX_ROUTE,
    toLatLng: [toLatLng.lat, toLatLng.lng],
  });

export const nearestRef = (refLatLng) => (dispatch) =>
  dispatch({
    type: CTX_NEAREST,
    refLatLng: [refLatLng.lat, refLatLng.lng],
  });

export const ctxStoreMap = (center, zoom) => ({
  type: CTX_MAP_STOREVIEW,
  center,
  zoom,
});

export const ctxHideGF = (doHide) => ({
  type: CTX_HIDE_GF,
  doHide,
});

export const ctxHideVehicles = (doHide) => ({
  type: CTX_HIDE_VEH,
  doHide,
});

export const ctxPowListTabType = (tabType) => ({
  type: CTX_PL_TAB,
  tabType,
});
