import React from 'react';
import pure from 'recompose/pure';
import RaisedButton from 'material-ui/RaisedButton';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';
import UsersList from './components/UsersList';

import styles from './styles.css';

const PERMISSIONS = [
  permissions.USERS_SEE,
  permissions.USERS_ADD_ANY,
];

const UsersManager = ({
  userPermittedTo = [],
}) => {
  if (!userPermittedTo[permissions.USERS_SEE]) {
    return null;
  }

  const addUserButton = userPermittedTo[permissions.USERS_ADD_ANY]
    ? <RaisedButton label="Add new user" primary />
    : null;

  return (
    <div className={styles.wrapper}>
      { addUserButton }
      <UsersList />
    </div>
  );
};

UsersManager.propTypes = {
  userPermittedTo: React.PropTypes.object,
};

export default pure(permitted(PERMISSIONS)(UsersManager));
