import React from 'react';
import Content from 'components/Content';
import Widget from 'components/Widget';
import FleetSummary from 'containers/FleetSummary';
import { onProduction, onStage } from 'configs';
import { translate } from 'utils/i18n';
import D3Sandbox from './components/Sandbox';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

function canShow(Component) {
  if (Component === FleetSummary) {
    return true;
  }

  if ((Component === D3Sandbox) && !onProduction && !onStage) {
    return true;
  }

  return false;
}

const DashboardScreen = ({ translations }) => (
  <Content center>
    { canShow(FleetSummary) && (
      <Widget
        containerClass={classes.dashboard__summaryGroup}
        title={ translations.fleet_summary_title }
      >
        <FleetSummary />
      </Widget>
    )}

    { canShow(D3Sandbox) && <D3Sandbox /> }
  </Content>
);

DashboardScreen.propTypes = {
  translations: phrasesShape.isRequired,
};

DashboardScreen.displayName = 'DashboardScreen';
DashboardScreen.defaultProps = {
  translations: phrases,
};

export default translate()(DashboardScreen);
