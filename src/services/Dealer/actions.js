export const DEALER_PORTAL_READY_SET = 'dealer portal set ready state';

export const changeDealerReadyState = isReady => ({
  type: DEALER_PORTAL_READY_SET,
  isReady,
});
