export default function getExtentionAuthorizationHeader(extName, {
  mgmtAccessToken,
  authExtAccessToken,
}) {
  let token;

  switch (extName) {
    case 'managmentAPI': {
      token = mgmtAccessToken;
      break;
    }

    case 'authorizationExtAPI': {
      token = authExtAccessToken;
      break;
    }

    default: token = undefined;
  }

  if (token === undefined) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
}
