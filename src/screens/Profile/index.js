import React from 'react';
import { css } from 'aphrodite/no-important';
import Content from 'components/Content';
import ProfileDetails from './components/ProfileDetails';
import LanguageWidget from './components/LanguageWidget';

import classes from './classes';

const ProfileScreen = () => (
  <Content>
    <div className={css(classes.widget)}>
      <ProfileDetails />
    </div>
    <div className={css(classes.widget)}>
      <LanguageWidget />
    </div>
  </Content>
);

export default ProfileScreen;
