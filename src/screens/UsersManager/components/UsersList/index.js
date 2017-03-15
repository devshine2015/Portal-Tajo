import React from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import pure from 'recompose/pure';
import Subheader from 'material-ui/Subheader';
import { usersActions } from 'services/Users/actions';
import {
  getUsers,
  getGrouping,
  getGroupBy,
  getPermissions,
} from 'services/Users/reducer';
import UserItem from '../UserItem';
import UserPermissionsList from '../UserPermissionsList';

import styles from './styles.css';

const STYLES = {
  subheader: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
};

const renderAllPermissons = (allPermissions) => (userPermissions = [], userId) => (
  <UserPermissionsList
    allPermissions={allPermissions.toJS()}
    userPermissions={userPermissions}
    userId={userId}
  />
);

function renderUsers(groupIndexies, allUsers, permissionsRenderer) {
  return groupIndexies.map(index => {
    const user = allUsers.get(index);

    return (
      <li
        key={index}
        className={styles.list__item}
      >
        <UserItem
          {...user}
          renderPermissions={permissionsRenderer}
        />
      </li>
    );
  });
}

function renderGroups({ currentGrouping, users, permissionsRenderer }) {
  const groups = currentGrouping.keys();
  const k = [];
  for (let group of groups) {
    // get indexies of users from group
    const usersIndexies = currentGrouping.get(group);

    k.push(
      <div
        className={styles.group}
        key={group}
      >
        <Subheader style={STYLES.subheader}>{group}</Subheader>
        <ul className={styles.list}>
          { renderUsers(usersIndexies, users, permissionsRenderer) }
        </ul>
      </div>
    );
  }

  return k;
}

class UsersList extends React.Component {

  componentWillMount() {
    this.props.fetchUsers(this.props.groupBy);
  }

  render() {
    const { users, currentGrouping, allPermissions } = this.props;

    if (users.size === 0) {
      return null;
    }

    const permissionsRenderer = renderAllPermissons(allPermissions);
    const groups = renderGroups({ currentGrouping, users, permissionsRenderer });

    return (
      <div className={styles.groups}>
        { groups }
      </div>
    );
  }
}

UsersList.propTypes = {
  groupBy: React.PropTypes.oneOf([
    'fleet', 'role',
  ]).isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  users: React.PropTypes.instanceOf(List).isRequired,
  currentGrouping: React.PropTypes.instanceOf(Map).isRequired,
  allPermissions: React.PropTypes.instanceOf(List).isRequired,
};

const mapState = state => ({
  users: getUsers(state),
  currentGrouping: getGrouping(state),
  groupBy: getGroupBy(state),
  allPermissions: getPermissions(state),
});
const mapDispatch = {
  fetchUsers: usersActions.fetchUsers,
};

const PureUsersList = pure(UsersList);

export default connect(mapState, mapDispatch)(PureUsersList);
