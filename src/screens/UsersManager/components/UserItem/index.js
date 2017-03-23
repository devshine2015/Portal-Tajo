import React from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import { VelocityComponent } from 'velocity-react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  FlatButton,
  Dialog,
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

const DeleteUserDialog = ({
  handleClose,
  handleConfirm,
  open,
}) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={handleClose}
    />,
    <FlatButton
      label="Confirm"
      primary
      onTouchTap={handleConfirm}
    />,
  ];

  return (
    <Dialog
      actions={actions}
      open={open}
      onRequestClose={handleClose}
    >
      You are going to completely remove user out of the system.<br />
      Please confirm this action.
    </Dialog>
  );
};

DeleteUserDialog.propTypes = {
  handleClose: React.PropTypes.func.isRequired,
  handleConfirm: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
};

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
  const toggleButtonLabel = isExpanded ? 'Close' : 'Details';

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
    isDEleting: false,
    dialogIsOpen: false,
  }

  onDeleteConfirm = () => {
    this.setState({
      dialogIsOpen: false,
      expanded: false,
      isDeleting: true,
    }, () => {
      window.setTimeout(() => {
        this.props.deleteUser(this.props.profile.user_id);
      }, this.duration);
    });
  }

  duration = 500

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

  handleClose = () => {
    this.setState({
      dialogIsOpen: false,
    });
  }

  handleOpen = () => {
    this.setState({
      dialogIsOpen: true,
    });
  }

  render() {
    const { profile } = this.props;
    const title = profile.nickname || profile.name || profile.email;
    const animation = `transition.slideLeftBig${(this.state.isDeleting ? 'Out' : 'In')}`;

    return (
      <VelocityComponent
        runOnMount
        animation={animation}
        duration={this.duration}
        key={profile.user_id}
      >
        <div>
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
              deleteUser={this.handleOpen}
            />
          </Card>

          <DeleteUserDialog
            open={this.state.dialogIsOpen}
            handleConfirm={this.onDeleteConfirm}
            handleClose={this.handleClose}
          />
        </div>
      </VelocityComponent>
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
