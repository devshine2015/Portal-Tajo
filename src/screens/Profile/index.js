import React from 'react';
import { css } from 'aphrodite/no-important';
import Layout from 'components/Layout';
import ProfileDetails from './components/ProfileDetails';
import LanguageWidget from './components/LanguageWidget';

import classes from './classes';

const userCanSeeProfile = context => context.authorizeWithPerms('view:profile');

const ProfileScreen = (props, context) => (
  <Layout.Content>
    { userCanSeeProfile(context) && (
      <div className={css(classes.widget)}>
        <ProfileDetails />
      </div>
    )}
    <div className={css(classes.widget)}>
      <LanguageWidget />
    </div>
  </Layout.Content>
);

ProfileScreen.contextTypes = {
  authorizeWithPerms: React.PropTypes.func.isRequired,
};

export default ProfileScreen;
