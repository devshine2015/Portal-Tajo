import React from 'react';
import Content from './components/Content';
import VehiclesList from './components/VehiclesList';

const AlertLogs = () => (
  <div style={{ height: '100%' }}>
    <VehiclesList />
    <Content />
  </div>
);

export default AlertLogs;
