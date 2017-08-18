import React from 'react';
import { translate } from 'utils/i18n';
import Layout from 'components/Layout';
import Widget from 'components/Widget';
import FleetSummary from 'containers/FleetSummary';
import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

const DashboardScreen = ({ translations }) => (
  <Layout.Content center>
    <Widget
      containerClass={classes.dashboard__summaryGroup}
      title={translations.fleet_summary_title}
    >
      <FleetSummary />
    </Widget>
    <div>Graph chart</div>

  </Layout.Content>
);

DashboardScreen.propTypes = {
  translations: phrasesShape.isRequired,
};

DashboardScreen.displayName = 'DashboardScreen';
DashboardScreen.defaultProps = {
  translations: phrases,
};

export default translate()(DashboardScreen);
