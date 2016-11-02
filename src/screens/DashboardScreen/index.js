import React from 'react';
import { portal } from 'configs';
import { css } from 'aphrodite/no-important';
import EventsCalculator from 'containers/EventsCalculator';
import FleetSummary from 'containers/FleetSummary';
import classes from './classes';

function canShow(Component) {
  if (Component === EventsCalculator) {
    return false && portal === 'tajo';
  }

  if (Component === FleetSummary) {
    return true;
  }

  return false;
}

const DashboardScreen = () => (
  <div className={css(classes.dashboard)}>
    { canShow(EventsCalculator) && <EventsCalculator /> }
    { canShow(FleetSummary) && <FleetSummary /> }
  </div>
);

export default DashboardScreen;
