import React from 'react';
import { isEscape } from 'configs';
import Content from 'components/Content';
import Widget from 'components/Widget';
import EventsCalculator from 'containers/EventsCalculator';
import FleetSummary from 'containers/FleetSummary';
import classes from './classes';

function canShow(Component) {
  if (Component === EventsCalculator) {
    return false && isEscape;
  }

  if (Component === FleetSummary) {
    return true;
  }

  return false;
}

const DashboardScreen = () => (
  <Content>
    { canShow(EventsCalculator) && <EventsCalculator /> }
    { canShow(FleetSummary) && (
      <Widget
        containerClass={classes.dashboard__summaryGroup}
        title="Fleet Summary"
      >
        <FleetSummary />
      </Widget>
    )}
  </Content>
);

export default DashboardScreen;
