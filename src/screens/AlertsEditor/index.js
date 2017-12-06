import React from 'react';
import Layout from 'components/Layout';
import { isDealer } from 'configs';
import SpeedSection from './components/AlertTypes/SpeedSection';
import TempSection from './components/AlertTypes/TempSection';
import OdoSection from './components/AlertTypes/OdoSection';
import DriveTimeSection from './components/AlertTypes/DriveTimeSection';
// import FuelSection from './components/AlertTypes/FuelSection';
import FuelGainSection from './components/AlertTypes/FuelGainSection';
import FuelLossSection from './components/AlertTypes/FuelLossSection';


const AlertsEditor = () => {
  if (isDealer) {
    return (
      <Layout.Content noPadding maxWidth={'inherit'}>
        <OdoSection />
        <FuelGainSection />
        <FuelLossSection />
      </Layout.Content>);
  }
  return (
    <Layout.Content noPadding maxWidth={'inherit'}>
      <SpeedSection />
      <TempSection />
      <FuelGainSection />
      <OdoSection />
      <DriveTimeSection />
    </Layout.Content>);
};

export default AlertsEditor;
