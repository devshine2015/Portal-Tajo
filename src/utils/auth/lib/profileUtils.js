import R from 'ramda';

export const getIdToken = R.ifElse(R.has('id_token'), R.prop('id_token'), R.prop('idToken'));
export const getAccessToken = R.ifElse(R.has('access_token'), R.prop('access_token'), R.prop('accessToken'));
export const getSessionId = R.prop('sessionId');
export const isLegacyProfile = R.compose(R.isNil, getIdToken);
export const getAuthenticationString = (profile, isAuth0Enabled) => {
  return isAuth0Enabled ? getIdToken(profile) : getSessionId(profile);
};
export const getFleetName = R.path(['app_metadata', 'fleet']);
export const extractTokens = profile => ({
  idToken: getIdToken(profile),
  accessToken: getAccessToken(profile),
  sessionId: getSessionId(profile),
});
export const useDefaultPassword = R.pathOr(false, ['user_metadata', 'isDefaultPassword']);

function makeWithPrefix(profile) {
  const prefix = 'https://drvrapp.net/';

  return function withPrefix(data, returnKey = false) {
    if (returnKey) {
      return `${prefix}${data}`;
    }

    return profile[`${prefix}${data}`];
  };
}

export function cleanupProfile(profile = {}) {
  const withPrefix = makeWithPrefix(profile);
  const appMetadata = withPrefix('app_metadata') || {};
  const userMetadata = withPrefix('user_metadata') || {};

  const cleaned = Object.assign({}, profile, {
    user_id: profile.user_id || profile.sub || null,
    roles: withPrefix('roles') || [profile.role],
    permissions: withPrefix('permissions') || [],
    app_metadata: Object.assign({}, appMetadata, {
      fleet: R.ifElse(R.has('fleet'), R.prop('fleet'), R.always(appMetadata.fleet))(profile),
    }),
    user_metadata: userMetadata,
  });

  // all this properties already mirrored above
  // so we can clean object from them
  delete cleaned.sub;
  delete cleaned.role;
  delete cleaned.fleet;
  delete cleaned.clientID;
  delete cleaned.global_client_id;
  delete cleaned[withPrefix('roles', true)];
  delete cleaned[withPrefix('permissions', true)];
  delete cleaned[withPrefix('app_metadata', true)];
  delete cleaned[withPrefix('user_metadata', true)];

  return cleaned;
}

export default {
  getFleetName,
  cleanupProfile,
  getIdToken,
  getAccessToken,
  getSessionId,
  extractTokens,
  isLegacyProfile,
  getAuthenticationString,
  useDefaultPassword,
};
