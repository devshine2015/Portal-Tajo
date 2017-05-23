import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import TimelineEvent from './TimelineEvent';
import classes from './AlertsTimeline.classes';

const EmptyTimeline = () => (
  <div className={css([classes.listWrapper, classes.listWrapper_empty])}>
    No events for specified period
  </div>
);

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

        { this.props.entries.size !== 0 ? <EmptyTimeline /> : (
          <div className={css(classes.listWrapper)}>
            { this.renderEvents() }
          </div>
        )}

      </div>
    );
  }
}

AlertsTimeline.propTypes = {
  entries: React.PropTypes.instanceOf(List).isRequired,
};

export default AlertsTimeline;
