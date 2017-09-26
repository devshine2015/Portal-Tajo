import { connect } from 'react-redux';
import { usersActions } from 'services/Users/actions';
import { makeGetUsersInfo } from './selectors';
import UsersList from './UsersList';

const makeMapProps = () => {
  const getUsersInfo = makeGetUsersInfo();
  return function mapProps(state) {
    return {
      users: getUsersInfo(state),
      // users: usersSelectors.getUsers(state),
      // usersToRolesMap: usersSelectors.getUsersToRolesMap(state),
      // allPermissions: getPermissionsList(state),
    };
  };
};

const actions = {
  assignPermission: usersActions.assignPermission,
};

export default connect(makeMapProps, actions)(UsersList);
