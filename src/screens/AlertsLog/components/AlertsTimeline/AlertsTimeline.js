import React from 'react';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { getJournalSlice } from 'services/AlertsSystem/reducer';
import makeGetAlertEntries from './selector';
import TimelineEvent from './TimelineEvent';
import classes from './AlertsTimeline.classes';


const Header = () => {
  return (
    <div className={css(classes.header)}>
      <h3 className={css(classes.header__main)}>Historical Timeline</h3>
      <p className={css(classes.header__sub)}>
        Showing events for last 24 hours.
      </p>
    </div>
  );
};

class AlertsTimeline extends React.Component {

  renderEvents() {
    return this.props.entries.map((event) => {
      return <TimelineEvent key={event.eventTS} {...event} />;
    });
  }

  render() {
    return (
      <div className={css(classes.wrapper)}>
        <Header />
        <div className={css(classes.listWrapper)}>
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
