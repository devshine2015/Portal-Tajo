// For using inside configs only

function existInUrl(where = 'origin', part) {
  return window.location[where].search(part) !== -1;
}

export const chooseServerEnv = () => {
  if (existInUrl('origin', 'drvrapp.net')) {
    return 'production';
  } else if (existInUrl('origin', 'drvrstage')) {
    return 'stage';
  } else if (existInUrl('origin', 'ddsdev')) {
    return 'dev';
  }

  return 'local';
};

function chooseProjectFolder(serverEnv, project) {
  // serve all projects from the root on the local server
  if (serverEnv === 'local') {
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
    if (existInUrl('pathname', extras[i])) {
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
