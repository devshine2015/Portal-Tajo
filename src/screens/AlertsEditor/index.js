import React from 'react';
import { css } from 'aphrodite/no-important';
import SpeedSection from './components/AlertTypes/SpeedSection';
import TempSection from './components/AlertTypes/TempSection';
import OdoSection from './components/AlertTypes/OdoSection';
import DriveTimeSection from './components/AlertTypes/DriveTimeSection';

import classes from './classes';


class AlertsEditor extends React.Component {
  render() {
    return (
      /*<Content>
        <Layout.Row>*/
      <div className={css(classes.content)}>
        <SpeedSection />
        <TempSection />
        <OdoSection />
        <DriveTimeSection />
      </div>
      //   </Layout.Row>
      // </Content>
    );
  }
}

export default AlertsEditor;
