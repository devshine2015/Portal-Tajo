import React from 'react';
import { css } from 'aphrodite/no-important';
import Content from 'components/Content';
import Layout from 'components/Layout';
import SpeedSection from './components/AlertTypes/SpeedSection';
import TempSection from './components/AlertTypes/TempSection';
import OdoSection from './components/AlertTypes/OdoSection';

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
          </div>
      //   </Layout.Row>
      // </Content>
    );
  }
}

export default AlertsEditor;
