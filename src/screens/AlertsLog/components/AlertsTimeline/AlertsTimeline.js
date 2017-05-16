import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { getJournalSlice } from 'services/AlertsSystem/reducer';
import makeGetNotifications from 'services/AlertsSystem/selectors';
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
      return (
        <TimelineEvent
          {...event.toJS()}
          key={event.get('id')}
        />
      );
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
  entries: React.PropTypes.instanceOf(List).isRequired,
};

const makeMapStateToProps = () => {
  const getNotifications = makeGetNotifications();

  const mapStateToProps = state => ({
    entries: getNotifications(getJournalSlice(state)),
  });

  return mapStateToProps;
};

export default connect(makeMapStateToProps)(AlertsTimeline);
