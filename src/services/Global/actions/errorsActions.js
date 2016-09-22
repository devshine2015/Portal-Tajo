export const GLOBAL_ERROR_SET = 'portal/services/GLOBAL_ERROR_SET';
export const GLOBAL_ERROR_RESET = 'portal/services/GLOBAL_ERROR_RESET';

export const setError = (localisedError = {}) => ({
  type: GLOBAL_ERROR_SET,
  error: localisedError,
});

export const resetError = () => ({
  type: GLOBAL_ERROR_RESET,
});
