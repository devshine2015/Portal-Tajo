import React from 'react';
import Content from './components/Content/ConnectedContent';
import VehiclesList from './components/VehiclesList/ConnectedVehiclesList';

const AlertLogs = () => (
  <div style={{ height: '100%' }}>
    <VehiclesList />
    <Content />
  </div>
);

export default AlertLogs;
