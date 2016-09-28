import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';
import { getGroupBy } from './reducer';
import UsersList from './components/UsersList';
import ToolsPanel from './components/ToolsPanel';

import styles from './styles.css';

function renderTools(groupBy) {
  return <ToolsPanel />;
}

const PERMISSIONS = [
  permissions.USERS_SEE,
  permissions.USERS_ADD_ANY,
];

const UsersManager = ({
  userPermittedTo = [],
  groupBy,
}) => {
  if (!userPermittedTo[permissions.USERS_SEE]) {
    return null;
  }

  const addUserButton = userPermittedTo[permissions.USERS_ADD_ANY]
    ? <RaisedButton label="Add new user" primary />
    : null;

  return (
    <div className={styles.wrapper}>
      { renderTools(groupBy) }
      <Divider />
      { addUserButton }
      <UsersList groupBy={groupBy} />
    </div>
  );
};

UsersManager.propTypes = {
  userPermittedTo: React.PropTypes.object,
  groupBy: React.PropTypes.oneOf([
    'fleet', 'role',
  ]).isRequired,
};

const mapState = state => ({
  groupBy: getGroupBy(state),
});
const mapDispatch = null;

const PureUsersManager = pure(permitted(PERMISSIONS)(UsersManager));

export default connect(mapState, mapDispatch)(PureUsersManager);
