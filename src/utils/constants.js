const isDev = process.env.NODE_ENV !== 'production';
const protocol = document.location.protocol;
const onProduction = location.hostname === 'drvrapp.net';

export const LOCAL_STORAGE_SESSION_KEY = onProduction ? 'ngStorage-sessionId_tajo' : 'ngStorage-sessionId';
export const LOCAL_STORAGE_DATA_KEY = onProduction ? 'drvr_installer_tajo' : 'drvr_installer';
export const HOST_BASE = isDev ? `${protocol}//ddsdev.cloudapp.net:8080/engine` : '/engine';
