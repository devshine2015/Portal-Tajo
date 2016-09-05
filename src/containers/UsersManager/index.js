import React from 'react';
import pure from 'recompose/pure';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';

const PERMISSIONS = [
  permissions.USERS_SEE,
];

const UsersManager = ({
  userPermittedTo = [],
}) => {
  if (!userPermittedTo[permissions.USERS_SEE]) {
    return null;
  }

  return (
    <div>UsersManager Screen</div>
  );
};

UsersManager.propTypes = {
  userPermittedTo: React.PropTypes.object,
};

export default pure(permitted(PERMISSIONS)(UsersManager));
