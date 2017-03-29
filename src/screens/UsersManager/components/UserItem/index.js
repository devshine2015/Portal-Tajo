import React from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import {
  VelocityComponent,
  VelocityTransitionGroup,
} from 'velocity-react';
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
import { translate } from 'utils/i18n';
// import permitted from 'utils/permissionsRequired';

import phrases, { phrasesShape } from './PropTypes';
import classes from './classes';

// const PERMISSIONS = [
//   globalPermissions.USERS_EDIT_ANY,
//   globalPermissions.USERS_DELETE_ANY,
// ];

const DeleteUserDialog = ({
  handleClose,
  handleConfirm,
  open,
  translations,
}) => {
  const actions = [
    <FlatButton
      label={translations.cancel}
      primary
      onTouchTap={handleClose}
    />,
    <FlatButton
      label={translations.confirm}
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
      {`${translations.confirm_delete_str1}.`}<br />
      {`${translations.confirm_delete_str2}.`}
    </Dialog>
  );
};

DeleteUserDialog.propTypes = {
  handleClose: React.PropTypes.func.isRequired,
  handleConfirm: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  translations: phrasesShape.isRequired,
};

function userCan(permission, userPermittedTo) {
  return true; //userPermittedTo[permission];
}

function makeLastActiveString(lastActive, translations) {
  let lastActiveDate = translations.never;

  if (lastActive) {
    lastActiveDate = new Date(lastActive).toLocaleString();
  }

  return `${translations.last_login}: ${lastActiveDate}`;
}

function Actions({
  userPermittedTo,
  lastActive,
  expandToggle,
  isExpanded,
  deleteUser,
  translations,
}) {
  const canEdit = userCan(globalPermissions.USERS_EDIT_ANY, userPermittedTo);
  const canDelete = userCan(globalPermissions.USERS_DELETE_ANY, userPermittedTo);
  const canDoNothing = !canDelete && !canEdit;
  const toggleButtonLabel = isExpanded ?
    translations.close : translations.details;

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
      label={translations.delete}
      onTouchTap={deleteUser}
    />;

  return (
    <CardActions className={css(classes.actions)}>
      <div className={css(classes.lastActive)}>
        { makeLastActiveString(lastActive, translations) }
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
  translations: phrasesShape,
};

Actions.defaultProps = {
  lastActive: undefined,
};

const enterExpandAnimation = {
  animation: 'slideDown',
  duration: 300,
  style: { height: '' },
};
const leaveExpandAnimation = {
  animation: 'slideUp',
  duration: 300,
};

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
      // wait until animation finish
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

  renderSubtitle() {
    return (
      <dl>
        <dt className={css(classes.title)}>
          {`${this.props.translations.role}:`}&nbsp;
        </dt>
        <dd className={css(classes.detail)}>{this.props.role}</dd>
      </dl>
    );
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
              subtitle={this.renderSubtitle()}
              actAsExpander
              showExpandableButton
            />
            <VelocityTransitionGroup
              component="div"
              enter={enterExpandAnimation}
              leave={leaveExpandAnimation}
            >
              { this.state.expanded && (
                <CardText expandable>
                  {/* renderPermissions(permissions, index) */}

                  <UserItemDetails profile={profile} />

                </CardText>
              )}
            </VelocityTransitionGroup>
            <Actions
              userPermittedTo={this.props.userPermittedTo}
              lastActive={profile.last_login}
              expandToggle={this.handleExpandToggle}
              isExpanded={!!this.state.expanded}
              deleteUser={this.handleOpen}
              translations={this.props.translations}
            />
          </Card>

          <DeleteUserDialog
            open={this.state.dialogIsOpen}
            handleConfirm={this.onDeleteConfirm}
            handleClose={this.handleClose}
            translations={this.props.translations}
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
  role: React.PropTypes.string,

  translations: phrasesShape.isRequired,
};

UserItem.defaultProps = {
  permissions: [],
  role: '',
};

const mapState = null;
const mapDispatch = {
  deleteUser: usersActions.deleteUser,
};

const Translated = translate(phrases)(UserItem);

export default connect(mapState, mapDispatch)(Translated);
