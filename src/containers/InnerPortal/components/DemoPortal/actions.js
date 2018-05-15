export const INNER_PORTAL_PAGES_SET = 'portal/InnerPortal/INNER_PORTAL_PAGES_SET';
export const TOGGLE_VEHICLE_PANEL = 'demoportal/InnerPortal/toggleVehiclePanel';
export const SELECT_OVERVIEW_VEHICLE = 'demoportal/InnerPortal/selectOverviewVehicle';

export const setInnerPortalPages = pages => ({
  type: INNER_PORTAL_PAGES_SET,
  pages,
});

export const toggleVehiclePanel = () => ({
  type: TOGGLE_VEHICLE_PANEL,
});

export const selectOverviewVehicle = id => ({
  type: SELECT_OVERVIEW_VEHICLE,
  id,
});
