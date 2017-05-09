import React from 'react';
import data from './data.json';
import TimelineEvent from './TimelineEvent';

class AlertsTimeline extends React.Component {

  renderEvents() {
    return data.map((event) => {
      return <TimelineEvent key={event.ev.ts} {...event.ev} />;
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h3 className="header">Historical Timeline</h3>
        <div className="timeline-wrapper">
          { this.renderEvents() }
        </div>
      </div>
    );
  }
}

export default AlertsTimeline;
