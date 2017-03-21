import React from 'react';
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
import permitted from 'utils/permissionsRequired';

import classes from './classes';

const PERMISSIONS = [
  globalPermissions.USERS_EDIT_ANY,
  globalPermissions.USERS_DELETE_ANY,
];

function userCan(permission, userPermittedTo) {
  return userPermittedTo[permission];
}

function makeLastActiveString(lastActive) {
  let lastActiveDate = 'never';

  if (lastActive) {
    lastActiveDate = new Date(lastActive).toLocaleString();
  }

  return `Last login: ${lastActiveDate}`;
}

function renderActions({
  userPermittedTo,
  lastActive,
  onExpand,
}) {
  const canEdit = userCan(globalPermissions.USERS_EDIT_ANY, userPermittedTo);
  const canDelete = userCan(globalPermissions.USERS_DELETE_ANY, userPermittedTo);
  const canDoNothing = !canDelete && !canEdit;

  if (canDoNothing) return null;

  let EditButton = () =>
    <FlatButton className={css(classes.button)} label="Edit" />;
  let DeleteButton = () =>
    <FlatButton className={css(classes.button)} label="Delete (not working)" />;

  return (
    <CardActions className={css(classes.actions)} actAsExpander>
      <div className={css(classes.lastActive)}>
        { makeLastActiveString(lastActive) }
      </div>

      <div className={css(classes.actions__buttons)}>
        { canEdit && <EditButton onTouchTap={onExpand} />}
        { canDelete && <DeleteButton />}
      </div>
    </CardActions>
  );
}

renderActions.propTypes = {
  userPermittedTo: React.PropTypes.object,
  onExpand: React.PropTypes.func.isRequired,
  lastActive: React.PropTypes.string,
};

renderActions.defaultProps = {
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

  handleExpandChange = expanded => {
    this.setState({ expanded });
  }

  handleExpand = () => {
    this.setState({
      expanded: true,
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
        { renderActions({
          userPermittedTo: this.props.userPermittedTo,
          lastActive: profile.last_login,
          onExpand: this.handleExpand,
        }) }
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
};

UserItem.defaultProps = {
  permissions: [],
};

export default permitted(PERMISSIONS)(UserItem);
