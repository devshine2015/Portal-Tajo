import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';
import { getIsAddingNewUser } from 'services/Users/reducer';
import { toggleNewUser } from 'services/Users/actions';
import UsersList from './components/UsersList';
import ToolsPanel from './components/ToolsPanel';
import UserEditor from './components/UserEditor';

import styles from './styles.css';

const PERMISSIONS = [
  permissions.USERS_SEE,
  permissions.USERS_ADD_ANY,
];

const UsersManager = ({
  userPermittedTo = [],
  isAddingNewUser,
  showNewUserCreator,
}) => {
  if (!userPermittedTo[permissions.USERS_SEE]) {
    return null;
  }

  const addUserButton = userPermittedTo[permissions.USERS_ADD_ANY] && !isAddingNewUser
    ? (
      <FloatingActionButton
        onClick={showNewUserCreator}
        className={styles.floatingButton}
        primary
      >
        <ContentAdd />
      </FloatingActionButton>
    )
    : null;

  return (
    <div className={styles.wrapper}>
      <ToolsPanel />
      { isAddingNewUser && <UserEditor editMode="create" /> }
      <UsersList />
      { addUserButton }
    </div>
  );
};

UsersManager.propTypes = {
  isAddingNewUser: React.PropTypes.bool.isRequired,
  userPermittedTo: React.PropTypes.object,
  showNewUserCreator: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  isAddingNewUser: getIsAddingNewUser(state),
});
const mapDispatch = dispatch => ({
  showNewUserCreator: () => dispatch(toggleNewUser(true)),
});

const PureUsersManager = pure(permitted(PERMISSIONS)(UsersManager));

export default connect(mapState, mapDispatch)(PureUsersManager);
