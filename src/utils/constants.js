const isDev = process.env.NODE_ENV !== 'production';
const protocol = document.location.protocol;

export const LOCAL_STORAGE_SESSION_KEY = 'ngStorage-sessionId';
export const LOCAL_STORAGE_DATA_KEY = 'drvr_installer';
export const HOST_BASE = isDev ? `${protocol}//ddsdev.cloudapp.net:8080/engine` : '/engine';
