import React from 'react';
import pure from 'recompose/pure';
import InnerPortal from 'containers/InnerPortal';
import Operational from 'containers/Operational';

const OperationalScreen = () => (
  <InnerPortal hasRealTimeData>
    <Operational />
  </InnerPortal>
);

export default pure(OperationalScreen);
