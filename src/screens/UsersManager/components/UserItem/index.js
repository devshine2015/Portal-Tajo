import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Userpic from 'components/Userpic';
import { permissions as globalPermissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';

import styles from './styles.css';

const PERMISSIONS = [
  globalPermissions.USERS_EDIT_ANY,
  globalPermissions.USERS_DELETE_ANY,
];

function userCan(permission, userPermittedTo) {
  return userPermittedTo[permission];
}

function renderActions(userPermittedTo) {
  const canEdit = userCan(globalPermissions.USERS_EDIT_ANY, userPermittedTo);
  const canDelete = userCan(globalPermissions.USERS_DELETE_ANY, userPermittedTo);
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

function renderUserpic(status, username) {
  const backgroundColor = status === 'active' ? 'green' : 'red';

  return <Userpic backgroundColor={backgroundColor}>{username}</Userpic>;
}

function renderSubtitle(role, fleet) {
  return (
    <dl>
      <dt className={styles.title}>Fleet:&nbsp;</dt>
      <dd className={styles.detail}>{fleet}</dd>
      <br />
      <dt className={styles.title}>Role:&nbsp;</dt>
      <dd className={styles.detail}>{role}</dd>
    </dl>
  );
}

const UserItem = ({
  userPermittedTo = [],
  username,
  role,
  status,
  permissions,
  fleet,
  renderPermissions,
  index,
}) => (
  <Card>
    <CardHeader
      avatar={renderUserpic(status, username)}
      title={username}
      subtitle={renderSubtitle(role, fleet)}
      actAsExpander
      showExpandableButton
    />
    <CardText expandable>
      { renderPermissions(permissions, index) }
    </CardText>
    { renderActions(userPermittedTo) }
  </Card>
);

UserItem.propTypes = {
  role: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  fleet: React.PropTypes.string.isRequired,
  permissions: React.PropTypes.array,
  // user: React.PropTypes.instanceOf(Map).isRequired,
  userPermittedTo: React.PropTypes.object,
  renderPermissions: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
};

UserItem.defaultProps = {
  permissions: [],
};

export default permitted(PERMISSIONS)(UserItem);
