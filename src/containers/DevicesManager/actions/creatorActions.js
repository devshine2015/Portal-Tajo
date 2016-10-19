export const DEVICES_MANAGER_EDITOR_OPEN = 'portal/DevicesManager/DEVICES_MANAGER_EDITOR_OPEN';
export const DEVICES_MANAGER_EDITOR_CLOSE = 'portal/DevicesManager/DEVICES_MANAGER_EDITOR_CLOSE';

export const closeEditor = () => ({
  type: DEVICES_MANAGER_EDITOR_CLOSE,
});

export const openEditor = () => ({
  type: DEVICES_MANAGER_EDITOR_OPEN,
});

export const submitDevice = params => dispatch => {

};
