export const AUTH_SET = 'portal/App/AUTH_SET';
export const AUTH_RESET = 'portal/App/AUTH_RESET';

export const setAuthentication = (sessionId, fleet) => ({
  type: AUTH_SET,
  sessionId,
  fleet,
});
export const resetAuthentication = () => ({
  type: AUTH_RESET,
});
