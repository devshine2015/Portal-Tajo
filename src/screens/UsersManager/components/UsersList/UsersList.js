import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { List } from 'immutable';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import UserItem from '../UserItem';
import UserPermissionsList from '../UserPermissionsList';
import styles from './styles.css';

const phrases = ['something_went_wrong'];

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

function renderUsers({ users, permissionsRenderer }) {
  return users.map((user, index) => {
    return (
      <li
        key={user.get('user_id')}
        className={styles.list__item}
      >
        <UserItem
          profile={user.toJS()}
          index={index}
          renderPermissions={permissionsRenderer}
          role={user.get('role')}
        />
      </li>
    );
  });
}

renderUsers.propTypes = {
  users: PropTypes.instanceOf(List).isRequired,
  permissionsRenderer: PropTypes.func.isRequired,
};

class UsersList extends React.Component {

  assignPermission = (permissionId, userIndex, permissionAssigned) => {
    this.props.assignPermission(permissionId, userIndex, permissionAssigned);
  }

  render() {
    const { users, allPermissions } = this.props;

    const permissionsRenderer = renderAllPermissons(allPermissions, this.assignPermission);
    const usersList = renderUsers({ users, permissionsRenderer });

    return (
      <ul className={styles.list}>
        { usersList }
      </ul>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.instanceOf(List).isRequired,
  allPermissions: PropTypes.instanceOf(List),
  assignPermission: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

UsersList.defaultProps = {
  allPermissions: new List([]),
};

const Translated = translate(phrases)(UsersList);
const PureUsersList = pure(Translated);

export default PureUsersList;
