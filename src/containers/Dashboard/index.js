import React from 'react';
import pure from 'recompose/pure';

class Dashboard extends React.Component {

  render() {
    return (
      <div>Dashboard</div>
    );
  }
};

const PureDashboard = pure(Dashboard);

export default PureDashboard;
