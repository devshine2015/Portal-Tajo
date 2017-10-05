import { createSelector } from 'reselect';
import { getProfile } from 'services/Session/reducer';
import { profileUtils } from 'utils/auth';

export default function makeGetProfileData() {
  return createSelector(getProfile, (imProfile) => {
    const profile = imProfile.toJS();

    return {
      isDefaultPassword: profileUtils.useDefaultPassword(profile),
      userId: profile.user_id,
    };
  });
}
