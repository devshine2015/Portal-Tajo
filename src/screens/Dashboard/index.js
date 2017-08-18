import React from 'react';
import Layout from 'components/Layout';
import { FleetSummaryWidget } from 'containers/FleetSummary';
import classes from './classes';

const DashboardScreen = () => (
  <Layout.Content center>
    <FleetSummaryWidget containerClass={classes.dashboard__summaryGroup} />
    <div>Graph chart</div>

  </Layout.Content>
);

DashboardScreen.propTypes = {};

DashboardScreen.displayName = 'DashboardScreen';

export default DashboardScreen;
