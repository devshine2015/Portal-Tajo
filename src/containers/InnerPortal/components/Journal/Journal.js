import React from 'react';
import uuid from 'node-uuid';
import { css } from 'aphrodite/no-important';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import NotificationsBtn from './NotificationsBtn';
import Entry from './Entry';
import classes from './Journal.classes';

const ANCHOR_ORIGIN = { horizontal: 'right', vertical: 'bottom' };
const TARGET_ORIGIN = { horizontal: 'right', vertical: 'top' };

const notifs = [{
  id: uuid.v4(),
  eventTS: Date.now(),
  eventKind: 'temperature-alert',
  eventName: 'Some Notification name',
  ownerName: 'Late Night #4 ig:1',
}, {
  id: uuid.v4(),
  eventTS: Date.now(),
  eventKind: 'speeding-alert',
  eventName: 'Some Notification name',
  ownerName: 'Car number 4',
}, {
  id: uuid.v4(),
  eventTS: Date.now(),
  eventKind: 'idling-alert',
  eventName: 'Some Notification name',
  ownerName: 'Late Night #5',
}];

const JournalHeader = () => (
  <div className={css(classes.header)}>
    <div className={css(classes.header__text)}>Notifications</div>
  </div>
);

class Journal extends React.Component {

  state = {
    isOpened: true,
  };

  toggleJournal = (e) => {
    e.preventDefault();

    this.setState({
      isOpened: !this.state.isOpened,
      anchorEl: e.currentTarget,
    });
  }

  closeJournal = () => {
    this.setState({
      isOpened: false,
    });
  }

  dissmissEvent = (id) => {
    console.log(id);
  }

  renderEntries() {
    return this.props.notifications.map(n => (
      <li
        key={n.id}
        className={css(classes.entries__item)}
      >
        <Entry
          {...n}
          onDissmiss={this.dissmissEvent}
        />
      </li>
    ));
  }

  render() {
    return (
      <div>
        <NotificationsBtn
          onClick={this.toggleJournal}
          count={10}
        />
        <Popover
          anchorEl={this.state.anchorEl}
          open={this.state.isOpened}
          anchorOrigin={ANCHOR_ORIGIN}
          targetOrigin={TARGET_ORIGIN}
          onRequestClose={this.closeJournal}
          animation={PopoverAnimationVertical}
        >
          <div className={css(classes.journal)}>
            <JournalHeader />

            <ul className={css(classes.entries)}>
              { this.renderEntries() }
            </ul>
          </div>
        </Popover>
      </div>
    );
  }
}

Journal.propTypes = {
  notifications: React.PropTypes.arrayOf(
    React.PropTypes.object.isRequired,
  ).isRequired,
};

Journal.defaultProps = {
  notifications: notifs,
};

export default Journal;
