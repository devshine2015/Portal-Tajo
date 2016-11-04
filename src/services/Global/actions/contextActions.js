export const MAP_STOREVIEW = 'map/storeView';

export const ctxStoreMap = (center, zoom) => (dispatch) =>
  dispatch({
    type: MAP_STOREVIEW,
    center,
    zoom,
  });
