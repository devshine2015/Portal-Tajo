import React from 'react';
import Layout from 'components/Layout';
import { isDealer } from 'configs';
import SpeedSection from './components/AlertTypes/SpeedSection';
import TempSection from './components/AlertTypes/TempSection';
import OdoSection from './components/AlertTypes/OdoSection';
import DriveTimeSection from './components/AlertTypes/DriveTimeSection';
import FuelSection from './components/AlertTypes/FuelSection';


const AlertsEditor = () => {
  if (isDealer) {
    return (
      <Layout.Content noPadding maxWidth={'inherit'}>
        <FuelSection />
        <OdoSection />
      </Layout.Content>);
  }
  return (
    <Layout.Content noPadding maxWidth={'inherit'}>
      <SpeedSection />
      <TempSection />
      <FuelSection />
      <OdoSection />
      <DriveTimeSection />
    </Layout.Content>);
};

export default AlertsEditor;
