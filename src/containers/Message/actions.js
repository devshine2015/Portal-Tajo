export const MESSAGE_SHOW = 'portal/Message/MESSAGE_SHOW';
export const MESSAGE_HIDE = 'portal/Message/MESSAGE_HIDE';
export const MESSAGE_RESET = 'portal/Message/MESSAGE_RESET';

export const showMessage = (message, isError) => ({
  type: MESSAGE_SHOW,
  message,
  isError,
});

export const hideMessage = () => ({
  type: MESSAGE_HIDE,
});

export const resetMessage = () => ({
  type: MESSAGE_RESET,
});
