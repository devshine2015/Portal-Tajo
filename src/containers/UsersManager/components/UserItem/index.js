import React from 'react';
import pure from 'recompose/pure';
import {
  Card,
  CardActions,
  CardHeader,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Userpic from 'components/Userpic';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';

import styles from './styles.css';

const PERMISSIONS = [
  permissions.USERS_EDIT_ANY,
  permissions.USERS_DELETE_ANY,
];

function userCan(permission, userPermittedTo) {
  return userPermittedTo[permission];
}

function renderActions(userPermittedTo) {
  const canEdit = userCan(permissions.USERS_EDIT_ANY, userPermittedTo);
  const canDelete = userCan(permissions.USERS_DELETE_ANY, userPermittedTo);
  const canDoNothing = !canDelete && !canEdit;

  if (canDoNothing) return null;

  let EditButton = () => <FlatButton className={styles.button} label="Edit (not working)" />;
  let DeleteButton = () => <FlatButton className={styles.button} label="Delete (not working)" />;

  return (
    <CardActions className={styles.actions}>
      { canEdit && <EditButton />}
      { canDelete && <DeleteButton />}
    </CardActions>
  );
}

const UserItem = ({
  userPermittedTo = [],
  role,
  username,
  fleet,
  status,
}) => (
  <Card>
    <CardHeader
      avatar={<Userpic>{username}</Userpic>}
      title={username}
      subtitle={fleet}
    />
    { renderActions(userPermittedTo) }
  </Card>
);

UserItem.propTypes = {
  userPermittedTo: React.PropTypes.object,
  role: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  fleet: React.PropTypes.string.isRequired,
};

export default pure(permitted(PERMISSIONS)(UserItem));
