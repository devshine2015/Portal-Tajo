import R from 'ramda';

export const getIdToken = R.ifElse(R.has('id_token'), R.prop('id_token'), R.prop('idToken'));
export const getAccessToken = R.ifElse(R.has('access_token'), R.prop('access_token'), R.prop('accessToken'));
export const getSessionId = R.prop('sessionId');
export const isLegacyProfile = R.has('sessionId');
export const extractTokens = profile => ({
  idToken: getIdToken(profile),
  accessToken: getAccessToken(profile),
  sessionId: getSessionId(profile),
});

export function cleanupProfile(profile = {}) {
  const PREFIX = 'https://drvrapp.net/';
  const appMetadata = profile[`${PREFIX}app_metadata`] || {};
  const userMetadata = profile[`${PREFIX}user_metadata`] || {};

  const cleaned = Object.assign({}, profile, {
    user_id: profile.sub || null,
    roles: profile[`${PREFIX}roles`] || [profile.role],
    permissions: profile[`${PREFIX}permissions`] || [],
    app_metadata: Object.assign({}, appMetadata, {
      fleet: R.ifElse(R.has('fleet'), R.prop('fleet'), R.always(appMetadata.fleet))(profile),
    }),
    user_metadata: userMetadata,
  });

  // all this properties already mirrored above
  // so we can clean object from them
  delete cleaned.sub;
  delete cleaned.role;
  delete cleaned.id_token;
  delete cleaned.fleet;
  delete cleaned[`${PREFIX}roles`];
  delete cleaned[`${PREFIX}permissions`];
  delete cleaned[`${PREFIX}app_metadata`];
  delete cleaned[`${PREFIX}user_metadata`];

  return cleaned;
}

export default {
  cleanupProfile,
  getIdToken,
  getAccessToken,
  getSessionId,
  extractTokens,
  isLegacyProfile,
};
