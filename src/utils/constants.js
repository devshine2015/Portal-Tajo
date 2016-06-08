const isDev = process.env.NODE_ENV !== 'production';
const protocol = document.location.protocol;

export const SESSION_ID_STORAGE_KEY = 'ngStorage-sessionId';
export const HOST_BASE = isDev ? `${protocol}//ddsdev.cloudapp.net:8080/engine` : '/engine';
