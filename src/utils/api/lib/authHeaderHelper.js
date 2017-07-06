export default function getExtentionAuthorizationHeader(extName, {
  mgmtAccessToken,
  authExtAccessToken,
  idToken,
}) {
  let token = 'Bearer ';

  switch (extName) {
    case 'mgmtApi': {
      token += mgmtAccessToken;
      break;
    }

    case 'authExtApi': {
      token += authExtAccessToken;
      break;
    }

    default: token += idToken;
  }

  return {
    Authorization: token,
  };
}
