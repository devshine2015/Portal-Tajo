import React from 'react';
import { css } from 'aphrodite/no-important';
import SpeedSection from './components/AlertTypes/SpeedSection';
import TempSection from './components/AlertTypes/TempSection';
import OdoSection from './components/AlertTypes/OdoSection';
import DriveTimeSection from './components/AlertTypes/DriveTimeSection';
import Layout from 'components/Layout';

class AlertsEditor extends React.Component {
  render() {
    return (
      <Layout.Content noPadding maxWidth={'inherit'}>
        <SpeedSection />
        <TempSection />
        <OdoSection />
        <DriveTimeSection />
      </Layout.Content>
    );
  }
}

export default AlertsEditor;
