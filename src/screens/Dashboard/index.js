import React from 'react';
import Layout from 'components/Layout';
import { FleetSummaryWidget } from './components/FleetSummary';
import JobsWidget from './components/JobsWidget';
import classes from './classes';

const DashboardScreen = () => (
  <Layout.Content center>
    <FleetSummaryWidget containerClass={classes.dashboard__summaryGroup} />
    <JobsWidget />
  </Layout.Content>
);

DashboardScreen.propTypes = {};
DashboardScreen.displayName = 'DashboardScreen';

export default DashboardScreen;
