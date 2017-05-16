import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';
import BellInactiveIcon from 'material-ui/svg-icons/social/notifications';
import {
  IconButton,
  Badge,
} from 'material-ui';
import classes from './NotificationsBtn.classes';

const STYLES = {
  badge: {
    height: 21,
    width: 21,
    fontSize: 10,
  },
  button: {
    padding: 0,
  },
};

class NotificationsBtn extends Component {

  state = {};

  render() {
    return (
      <IconButton
        style={STYLES.button}
        onClick={this.props.onClick}
      >
        <Badge
          badgeContent={this.props.count}
          badgeStyle={STYLES.badge}
          className={css(classes.badge)}
          secondary
        >
          <BellInactiveIcon color="white" />
        </Badge>
      </IconButton>
    );
  }
}

NotificationsBtn.propTypes = {
  count: React.PropTypes.number,
  onClick: React.PropTypes.func.isRequired,
};

NotificationsBtn.defaultProps = {
  count: 0,
};

export default NotificationsBtn;
