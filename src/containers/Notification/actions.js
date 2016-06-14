export const NOTIFICATION_SHOW = 'portal/Notification/NOTIFICATION_SHOW';
export const NOTIFICATION_HIDE = 'portal/Notification/NOTIFICATION_HIDE';

export const showNotification = () => ({
  type: NOTIFICATION_SHOW,
});

export const hideNotification = () => ({
  type: NOTIFICATION_HIDE,
});
