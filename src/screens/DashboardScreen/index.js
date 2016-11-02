import React from 'react';
import EventsCalculator from 'containers/EventsCalculator';
import { portal } from 'configs';
import pure from 'recompose/pure';

function canShow(Component) {
  if (Component === EventsCalculator) {
    return false && portal === 'tajo';
  }

  return false;
}

const DashboardScreen = () => (
  <div>
    { canShow(EventsCalculator) && <EventsCalculator /> }
  </div>
);

export default pure(DashboardScreen);
