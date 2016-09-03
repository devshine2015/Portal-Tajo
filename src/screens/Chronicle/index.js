import React from 'react';
import pure from 'recompose/pure';
import InnerPortal from 'containers/InnerPortal';
import Chronicle from 'containers/Chronicle';

const HistoryScreen = () => (
  <InnerPortal hasRealTimeData>
    <Chronicle />
  </InnerPortal>
);

export default pure(HistoryScreen);
