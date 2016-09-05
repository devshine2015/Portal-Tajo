export const USER_SET = 'portal/services/USER_SET';
export const USER_RESET = 'portal/services/USER_RESET';

export const setUserData = (data) => ({
  type: USER_SET,
  data,
});

export const resetUserData = () => ({
  type: USER_RESET,
});
