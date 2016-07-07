import React from 'react';
import pure from 'recompose/pure';
import InnerPortal from 'containers/InnerPortal';

const DashboardScreen = () => (
  <InnerPortal>
    <div>
      dashboard screen
    </div>
  </InnerPortal>
);

export default pure(DashboardScreen);
