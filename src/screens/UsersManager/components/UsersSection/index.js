import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';
import { getIsAddingNewUser } from 'services/Users/reducer';
import { toggleNewUser } from 'services/Users/actions';
import UsersList from '../UsersList';
// import ToolsPanel from '../ToolsPanel';
import UserEditor from '../UserEditor';
import SectionHeader from '../SectionHeader';
import MainActionButton from '../MainActionButton';

import styles from './styles.css';

const PERMISSIONS = [
  permissions.USERS_SEE,
  permissions.USERS_ADD_ANY,
];

const UsersSection = ({
  userPermittedTo = [],
  isAddingNewUser,
  showNewUserCreator,
}) => {
  if (!userPermittedTo[permissions.USERS_SEE]) {
    return null;
  }

  const canAddUser = userPermittedTo[permissions.USERS_ADD_ANY] && !isAddingNewUser;

  return (
    <div className={styles.wrapper}>
      <SectionHeader
        label="Users"
        action={canAddUser ? (
          <MainActionButton
            label="Create user"
            onClick={showNewUserCreator}
          />
        ) : null}
      />

      {/* <ToolsPanel /> */}

      { isAddingNewUser && <UserEditor editMode="create" /> }

      <UsersList />
    </div>
  );
};

UsersSection.propTypes = {
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

const PureUsersSection = pure(permitted(PERMISSIONS)(UsersSection));

export default connect(mapState, mapDispatch)(PureUsersSection);
