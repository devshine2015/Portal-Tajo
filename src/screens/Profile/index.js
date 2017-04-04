import React from 'react';
import { css } from 'aphrodite/no-important';
import Content from 'components/Content';
import ProfileDetails from './components/ProfileDetails';
import LanguageWidget from './components/LanguageWidget';

import classes from './classes';

const userCanSeeProfile = context => context.authorizeWithPerms('view:profile');

const ProfileScreen = (props, context) => (
  <Content>
    { userCanSeeProfile(context) && (
      <div className={css(classes.widget)}>
        <ProfileDetails />
      </div>
    )}
    <div className={css(classes.widget)}>
      <LanguageWidget />
    </div>
  </Content>
);

ProfileScreen.contextTypes = {
  authorizeWithPerms: React.PropTypes.func.isRequired,
};

export default ProfileScreen;
