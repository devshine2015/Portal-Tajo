import React from 'react';
import { portal } from 'configs';
import { css } from 'aphrodite/no-important';
import EventsCalculator from 'containers/EventsCalculator';
import FleetSummary from 'containers/FleetSummary';
import WidgetsGroup from './components/WidgetsGroup';
import classes from './classes';

const STYLES = {
  fleetSummaryGroup: {
    width: '70%',
    height: 300,
  },
};

function canShow(Component) {
  if (Component === EventsCalculator) {
    return false && portal === 'tajo';
  }

  if (Component === FleetSummary) {
    return true;
  }

  return false;
}

function renderGroup(component) {
  return (
    <WidgetsGroup
      containerStyle={STYLES.fleetSummaryGroup}
      title="Fleet Summary"
    >
      { component }
    </WidgetsGroup>
  );
}

const DashboardScreen = () => (
  <div className={css(classes.dashboard)}>
    { canShow(EventsCalculator) && <EventsCalculator /> }
    { canShow(FleetSummary) && renderGroup(<FleetSummary />) }
  </div>
);

export default DashboardScreen;
