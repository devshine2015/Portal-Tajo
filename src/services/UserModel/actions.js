export const USER_SET = 'portal/services/USER_SET';
export const USER_RESET = 'portal/services/USER_RESET';
export const USER_SETTINGS_UPDATE = 'portal/services/USER_SETTINGS_UPDATE';

export const setUserData = (data) => ({
  type: USER_SET,
  data,
});

export const resetUserData = () => ({
  type: USER_RESET,
});

export const updateUserSettings = settings => ({
  type: USER_SETTINGS_UPDATE,
  settings,
});
