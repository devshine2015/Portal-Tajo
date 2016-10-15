export const DEVICES_MANAGER_SEARCH = 'portal/DevicesManager/DEVICES_MANAGER_SEARCH';
export const DEVICES_MANAGER_SEARCH_RESET = 'portal/DevicesManager/DEVICES_MANAGER_SEARCH_RESET';

export const search = searchString => ({
  type: DEVICES_MANAGER_SEARCH,
  searchString,
});

export const searchReset = () => ({
  type: DEVICES_MANAGER_SEARCH_RESET,
});
