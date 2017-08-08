// For using inside configs only

/**
 * @param {String} part - what to search for in the string
 * @param {String} string - where to search
 * @returns {Boolean}
 */
function existInString(part, string = '') {
  return string.search(part) !== -1;
}

/**
 * checks if current url is matching one of
 * predefined urls, usually assocated with localhost
 * @returns {Boolean}
 */
export const isRunningOnLocalhost = () =>
  ['127.0.0.1', 'localhost'].indexOf(window.location.hostname) !== -1;

/**
 * Map provided url to a server environment string.
 * @param {String} serverUrl - url of the server
 * @returns {String} it might be: 'production', 'stage', 'dev'
 */
export const chooseServerEnv = (serverUrl) => {
  if (existInString('drvrapp.net', serverUrl)) {
    return 'production';
  } else if (existInString('drvrstage', serverUrl)) {
    return 'stage';
  }

  return 'dev';
};
