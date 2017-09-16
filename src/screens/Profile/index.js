import React from 'react';
import { css } from 'aphrodite/no-important';
import { authorizeWithPermissions } from 'utils/authz';
import Layout from 'components/Layout';
import ProfileDetails from './components/ProfileDetails';
import LanguageWidget from './components/LanguageWidget';

import classes from './classes';

const userCanSeeProfile = () => authorizeWithPermissions('view:profile');

const ProfileScreen = () => (
  <Layout.Content>
    { userCanSeeProfile() && (
      <div className={css(classes.widget)}>
        <ProfileDetails />
      </div>
    )}
    <div className={css(classes.widget)}>
      <LanguageWidget />
    </div>
  </Layout.Content>
);

export default ProfileScreen;
