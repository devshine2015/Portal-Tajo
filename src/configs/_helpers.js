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

function chooseProjectFolder(serverEnv, project) {
  // serve all projects from the root on the local server
  if (isRunningOnLocalhost()) {
    return '';
  }

  if (project === 'tajo') {
    return 'tajo';
  }

  return '';
}

function checkExtraRoot(extras = [], projectFolder) {
  let result = projectFolder;

  for (let i = 0; i < extras.length; i++) {
    if (existInString(extras[i], window.location.pathname)) {
      result = !projectFolder ? extras[i] : `${extras[i]}/${projectFolder}`;
    }
  }

  return `/${result}`;
}

export function chooseRoot(serverEnv, project) {
  const projectFolder = chooseProjectFolder(serverEnv, project);
  const devExtras = ['max', 'karl'];
  const stageExtras = ['candidate', 'sandbox'];

  switch (serverEnv) {
    case 'dev':
      return checkExtraRoot(devExtras, projectFolder);
    case 'stage':
      return checkExtraRoot(stageExtras, projectFolder);
    case 'production':
      return `/${projectFolder}`;
    default:
      // on local machine
      return `/${projectFolder}`;
  }
}
