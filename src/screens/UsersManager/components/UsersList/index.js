import React from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import pure from 'recompose/pure';
import { usersActions } from 'services/Users/actions';
import {
  getUsers,
  getPermissionsList,
  getUsersToRolesMap,
} from 'services/Users/reducer';
import UserItem from '../UserItem';
import UserPermissionsList from '../UserPermissionsList';
import AnimatedLogo from 'components/animated';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const renderAllPermissons = (allPermissions, onClick) => (userPermissions = [], userIndex) => {
  if (allPermissions === undefined || allPermissions.size === 0) {
    return null;
  }

  return (
    <UserPermissionsList
      allPermissions={allPermissions.toJS()}
      userPermissions={userPermissions}
      userIndex={userIndex}
      onPermissionClick={onClick}
    />
  );
};

function renderUsers({ users, usersToRolesMap, permissionsRenderer }) {
  return users.toArray().map((u, index) => {
    const user = u.toJS();

    return (
      <li
        key={user.user_id}
        className={styles.list__item}
      >
        <UserItem
          profile={user}
          index={index}
          renderPermissions={permissionsRenderer}
          role={usersToRolesMap.getIn([user.user_id, 'name'])}
        />
      </li>
    );
  });
}

renderUsers.propTypes = {
  users: React.PropTypes.instanceOf(List).isRequired,
  permissionsRenderer: React.PropTypes.func.isRequired,
  usersToRolesMap: React.PropTypes.instanceOf(Map).isRequired,
};

class UsersList extends React.Component {

  state = {
    isFetching: false,
    error: false,
  }

  componentWillMount() {
    if (this.props.users.size === 0) {
      this.fetchUsers();
    }
  }

  fetchUsers = () => {
    this.setState({
      isFetching: true,
      error: false,
    }, () => {
      this.props.fetchUsers()
        .then(() => {
          this.setState({
            isFetching: false,
          });
        }, () => {
          this.setState({
            error: `${this.props.translations.something_went_wrong}.`,
            isFetching: false,
          });
        });
    });
  }

  assignPermission = (permissionId, userIndex, permissionAssigned) => {
    this.props.assignPermission(permissionId, userIndex, permissionAssigned);
  }

  render() {
    const { users, allPermissions, usersToRolesMap } = this.props;

    if (users.size === 0 && !this.state.isFetching) {
      if (this.state.error) {
        return <div className={styles.error}>{this.state.error}</div>;
      }

      return null;
    }

    if (this.state.isFetching) {
      return <AnimatedLogo.FullscreenLogo />;
    }

    const permissionsRenderer = renderAllPermissons(allPermissions, this.assignPermission);
    const usersList = renderUsers({ users, usersToRolesMap, permissionsRenderer });

    return (
      <ul className={styles.list}>
        { usersList }
      </ul>
    );
  }
}

UsersList.propTypes = {
  fetchUsers: React.PropTypes.func.isRequired,
  users: React.PropTypes.instanceOf(List).isRequired,
  allPermissions: React.PropTypes.instanceOf(List),
  assignPermission: React.PropTypes.func.isRequired,
  translations: phrasesShape.isRequired,
  usersToRolesMap: React.PropTypes.instanceOf(Map).isRequired,
};

UsersList.defaultProps = {
  allPermissions: new List([]),
};

const mapState = state => ({
  users: getUsers(state),
  usersToRolesMap: getUsersToRolesMap(state),
  allPermissions: getPermissionsList(state),
});
const mapDispatch = {
  fetchUsers: usersActions.fetchUsers,
  assignPermission: usersActions.assignPermission,
};

const Translated = translate(phrases)(UsersList);
const PureUsersList = pure(Translated);

export default connect(mapState, mapDispatch)(PureUsersList);
