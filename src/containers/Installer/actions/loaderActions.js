export const INSTALLER_LOADER_STATE_SET = 'portal/Installer/INSTALLER_LOADER_STATE_SET';

export const setLoaderState = (nextState) => ({
  type: INSTALLER_LOADER_STATE_SET,
  nextState,
});
