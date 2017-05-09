import React from 'react';
import { connect } from 'react-redux';
import { getJournalSlice } from 'services/AlertsSystem/reducer';
import makeGetAlertEntries from './selector';
import TimelineEvent from './TimelineEvent';

class AlertsTimeline extends React.Component {

  renderEvents() {
    return this.props.entries.map((event) => {
      return <TimelineEvent key={event.eventTS} {...event} />;
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

AlertsTimeline.propTypes = {
  entries: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      eventTS: React.PropTypes.number.isRequired,
      eventKind: React.PropTypes.string.isRequired,
      eventName: React.PropTypes.string.isRequired,
      ownerName: React.PropTypes.string.isRequired,
    }).isRequired,
  ),
};

AlertsTimeline.defaultProps = {
  entries: [],
};

const makeMapStateToProps = () => {
  const getAlertEntries = makeGetAlertEntries();

  const mapStateToProps = state => ({
    entries: getAlertEntries(getJournalSlice(state)),
  });

  return mapStateToProps;
};

export default connect(makeMapStateToProps)(AlertsTimeline);
