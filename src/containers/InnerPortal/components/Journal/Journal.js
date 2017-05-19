import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import NotificationsBtn from './NotificationsBtn';
import Entry from './Entry';
import classes from './Journal.classes';

const ANCHOR_ORIGIN = { horizontal: 'right', vertical: 'bottom' };
const TARGET_ORIGIN = { horizontal: 'right', vertical: 'top' };

const STYLES = {
  popover: {
    marginTop: 8,
    overfloY: 'inherit',
  },
};

const NothingToShow = () => (
  <div className={css(classes.placeholder)}>
    There is no notifications yet
  </div>
);

const JournalHeader = () => (
  <div className={css(classes.header)}>
    <div className={css(classes.header__text)}>Notifications</div>
  </div>
);

/**
 *
 * @param {Number} lastClosingTS
 * @param {ImmutableList} notifications
 *
 * @returns {ImmutableList} notifications ids arrived after last journal closing
 */
function findUnreadNotifications(lastClosingTS = 0, notifications) {
  if (lastClosingTS === undefined) {
    return notifications;
  }

  const result = notifications.filter((n) => {
    return n.get('eventTS') > lastClosingTS;
  }).map(n => n.get('id'));

  return result;
}

function isNotificationUnread(notif, unreads) {
  return unreads.indexOf(notif.get('id')) !== -1;
}

class Journal extends React.Component {

  constructor(props) {
    super(props);

    const unreadNotifications = findUnreadNotifications(undefined, props.notifications);

    this.state = {
      isOpened: false,
      lastClosingTS: 0,
      unreadCount: unreadNotifications.size,
      unreadNotifications,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications.size !== this.props.notifications.size) {
      this.setUnreadNotifications(nextProps.notifications);
    }
  }

  setUnreadNotifications(nextNotifications) {
    const unreadNotifications = findUnreadNotifications(this.state.lastClosingTS, nextNotifications);

    this.setState({
      unreadNotifications,
      unreadCount: unreadNotifications.size,
    });
  }

  toggleJournal = (e) => {
    e.preventDefault();

    const willBeOpened = !this.state.isOpened;

    if (willBeOpened) {
      this.openJournal(e);
    } else {
      this.closeJournal();
    }
  }

  openJournal = (e) => {
    this.setState({
      isOpened: true,
      anchorEl: e.currentTarget,
      unreadCount: 0,
    });
  }

  closeJournal = () => {
    this.setState({
      isOpened: false,
      lastClosingTS: Date.now(),
      unreadNotifications: new List(),
    });
  }

  dissmissEvent = (id) => {
    console.log(id);
  }

  renderEntries() {
    return this.props.notifications.map(n => (
      <li
        key={n.get('id')}
        className={css(classes.entries__item)}
      >
        <Entry
          {...n.toJS()}
          onDissmiss={this.dissmissEvent}
          isUnread={isNotificationUnread(n, this.state.unreadNotifications)}
        />
      </li>
    ));
  }

  render() {
    const hasNotifications = this.props.notifications.size !== 0;

    return (
      <div>
        <NotificationsBtn
          onClick={this.toggleJournal}
          count={this.state.unreadCount}
        />
        <Popover
          anchorEl={this.state.anchorEl}
          open={this.state.isOpened}
          anchorOrigin={ANCHOR_ORIGIN}
          targetOrigin={TARGET_ORIGIN}
          onRequestClose={this.closeJournal}
          animation={PopoverAnimationVertical}
          style={STYLES.popover}
        >
          <div className={css(classes.journal)}>
            <JournalHeader />
            { hasNotifications ? (
              <ul className={css(classes.entries)}>
                { this.renderEntries() }
              </ul>
              ) : <NothingToShow />
            }
          </div>
        </Popover>
      </div>
    );
  }
}

Journal.propTypes = {
  notifications: React.PropTypes.instanceOf(List).isRequired,
};

export default Journal;
