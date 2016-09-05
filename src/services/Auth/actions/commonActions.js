export const AUTH_SET = 'portal/App/AUTH_SET';
export const AUTH_RESET = 'portal/App/AUTH_RESET';

export const setUserAuthentication = (sessionId, fleet) => ({
  type: AUTH_SET,
  sessionId,
  fleet,
});
export const resetUserAuthentication = () => ({
  type: AUTH_RESET,
});
