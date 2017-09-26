import { connect } from 'react-redux';
import { usersActions } from 'services/Users/actions';
// import { permissionsSelectors } from 'services/Users/selectors';
import { makeGetUsersInfo } from './selectors';
import UsersList from './UsersList';

const makeMapProps = () => {
  const getUsersInfo = makeGetUsersInfo();
  return function mapProps(state) {
    return {
      users: getUsersInfo(state),
      // usersToRolesMap: usersSelectors.getUsersToRolesMap(state),
      // allPermissions: permissionsSelectors.getPermissionsList(state),
    };
  };
};

const actions = {
  assignPermission: usersActions.assignPermission,
};

export default connect(makeMapProps, actions)(UsersList);
