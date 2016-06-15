export const isDev = process.env.NODE_ENV !== 'production';
export const protocol = document.location.protocol;
export const onProduction = location.hostname === 'drvrapp.net' && !isDev;
