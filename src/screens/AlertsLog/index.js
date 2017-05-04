import React, { Component } from 'react';
import FixedContent from 'components/FixedContent';
import VehiclesList from './components/VehiclesList/VehiclesList';

class AlertLogs extends Component {
  render() {
    return (
      <div>
        <VehiclesList />
        <FixedContent>
          Alert logs screen
        </FixedContent>
      </div>
    );
  }
}

export default AlertLogs;
