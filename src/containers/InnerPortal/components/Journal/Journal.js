import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import NotificationsBtn from './NotificationsBtn';
import Entry from './Entry';
import classes from './Journal.classes';

const ANCHOR_ORIGIN = { horizontal: 'right', vertical: 'bottom' };
const TARGET_ORIGIN = { horizontal: 'right', vertical: 'top' };

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

class Journal extends React.Component {

  state = {
    isOpened: false,
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
        key={n.get('id')}
        className={css(classes.entries__item)}
      >
        <Entry
          {...n.toJS()}
          onDissmiss={this.dissmissEvent}
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
          count={this.props.notifications.size}
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
