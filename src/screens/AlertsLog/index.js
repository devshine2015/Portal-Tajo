import React from 'react';
import Content from './components/Content/ConnectedContent';
import VehiclesList from './components/VehiclesList/VehiclesList';

const AlertLogs = () => (
  <div style={{ height: '100%' }}>
    <VehiclesList key="powerlist" />
    <Content key="content" />
  </div>
);

export default AlertLogs;
