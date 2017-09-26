export default function (extName, {
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

  return token;
}
