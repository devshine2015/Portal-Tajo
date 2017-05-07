import React from 'react';
import Layout from 'components/Layout';
import SpeedSection from './components/AlertTypes/SpeedSection';
import TempSection from './components/AlertTypes/TempSection';
import OdoSection from './components/AlertTypes/OdoSection';
import DriveTimeSection from './components/AlertTypes/DriveTimeSection';

const AlertsEditor = () => (
  <Layout.Content noPadding maxWidth={'inherit'}>
    <SpeedSection />
    <TempSection />
    <OdoSection />
    <DriveTimeSection />
  </Layout.Content>
);

export default AlertsEditor;
