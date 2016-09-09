const AUTH_SET = 'portal/App/AUTH_SET';
const AUTH_RESET = 'portal/App/AUTH_RESET';

const setAuthentication = (sessionId, fleet) => ({
  type: AUTH_SET,
  sessionId,
  fleet,
});
const resetAuthentication = () => ({
  type: AUTH_RESET,
});

export default {
  AUTH_SET,
  AUTH_RESET,
  setAuthentication,
  resetAuthentication,
};
