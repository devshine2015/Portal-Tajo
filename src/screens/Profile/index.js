import React from 'react';
import Content from 'components/Content';
import ProfileDetails from './components/ProfileDetails';
import SettingsSection from './components/SettingsSection';

const ProfileScreen = () => (
  <Content>
    <ProfileDetails />
    <SettingsSection />
  </Content>
);

export default ProfileScreen;
