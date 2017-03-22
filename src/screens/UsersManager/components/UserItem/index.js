import React from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  FlatButton,
} from 'material-ui';
import Userpic from 'components/Userpic';
import UserItemDetails from '../UserItemDetails';
import { permissions as globalPermissions } from 'configs/roles';
import { usersActions } from 'services/Users/actions';
// import permitted from 'utils/permissionsRequired';

import classes from './classes';

// const PERMISSIONS = [
//   globalPermissions.USERS_EDIT_ANY,
//   globalPermissions.USERS_DELETE_ANY,
// ];

function userCan(permission, userPermittedTo) {
  return true; //userPermittedTo[permission];
}

function makeLastActiveString(lastActive) {
  let lastActiveDate = 'never';

  if (lastActive) {
    lastActiveDate = new Date(lastActive).toLocaleString();
  }

  return `Last login: ${lastActiveDate}`;
}

function Actions({
  userPermittedTo,
  lastActive,
  expandToggle,
  isExpanded,
  deleteUser,
}) {
  const canEdit = userCan(globalPermissions.USERS_EDIT_ANY, userPermittedTo);
  const canDelete = userCan(globalPermissions.USERS_DELETE_ANY, userPermittedTo);
  const canDoNothing = !canDelete && !canEdit;
  const toggleButtonLabel = isExpanded ? 'Close' : 'Open';

  if (canDoNothing) return null;

  let ToggleButton = () =>
    <FlatButton
      className={css(classes.button)}
      label={toggleButtonLabel}
      onTouchTap={expandToggle}
    />;
  let DeleteButton = () =>
    <FlatButton
      className={css(classes.button)}
      label="Delete"
      onTouchTap={deleteUser}
    />;

  return (
    <CardActions className={css(classes.actions)}>
      <div className={css(classes.lastActive)}>
        { makeLastActiveString(lastActive) }
      </div>

      <div className={css(classes.actions__buttons)}>
        { canEdit && <ToggleButton />}
        { canDelete && <DeleteButton />}
      </div>
    </CardActions>
  );
}

Actions.propTypes = {
  userPermittedTo: React.PropTypes.object,
  expandToggle: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  lastActive: React.PropTypes.string,
  isExpanded: React.PropTypes.bool.isRequired,
};

Actions.defaultProps = {
  lastActive: undefined,
};

function renderSubtitle(role/* , fleet*/) {
  return (
    <dl>
      {/* <dt className={css(classes.title)}>Fleet:&nbsp;</dt>
      <dd className={css(classes.detail)}>{fleet}</dd>
      <br /> */}
      <dt className={css(classes.title)}>Role:&nbsp;</dt>
      <dd className={css(classes.detail)}>{role}</dd>
    </dl>
  );
}

class UserItem extends React.Component {

  state = {
    expanded: null,
  }

  onDeleteClick = () => {
    this.props.deleteUser(this.props.profile.user_id);
  }

  handleExpandChange = expanded => {
    this.setState({ expanded });
  }

  handleExpand = () => {
    this.setState({
      expanded: true,
    });
  }

  handleExpandToggle = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { profile } = this.props;
    const title = profile.nickname || profile.name || profile.email;

    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          avatar={<Userpic src={profile.picture} />}
          title={title}
          subtitle={renderSubtitle()}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          {/* renderPermissions(permissions, index) */}

          <UserItemDetails profile={profile} />

        </CardText>
        <Actions
          userPermittedTo={this.props.userPermittedTo}
          lastActive={profile.last_login}
          expandToggle={this.handleExpandToggle}
          isExpanded={!!this.state.expanded}
          deleteUser={this.onDeleteClick}
        />
      </Card>
    );
  }
}

UserItem.propTypes = {
  profile: React.PropTypes.object.isRequired,
  permissions: React.PropTypes.array,
  userPermittedTo: React.PropTypes.object,
  renderPermissions: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
};

UserItem.defaultProps = {
  permissions: [],
};

const mapState = null;
const mapDispatch = {
  deleteUser: usersActions.deleteUser,
};

export default connect(mapState, mapDispatch)(UserItem);
