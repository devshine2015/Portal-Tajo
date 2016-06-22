export const SNACKBAR_SHOW = 'portal/Snackbar/SNACKBAR_SHOW';
export const SNACKBAR_HIDE = 'portal/Snackbar/SNACKBAR_HIDE';

export const showSnackbar = (message, autoHideDuration) => ({
  type: SNACKBAR_SHOW,
  autoHideDuration,
  message,
});

export const hideSnackbar = () => ({
  type: SNACKBAR_HIDE,
});
