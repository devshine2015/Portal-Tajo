import React from 'react';
import EventsCalculator from 'containers/EventsCalculator';
import pure from 'recompose/pure';

const DashboardScreen = () => (
  <div>
    dashboard screen
    <EventsCalculator />
  </div>
);

export default pure(DashboardScreen);
