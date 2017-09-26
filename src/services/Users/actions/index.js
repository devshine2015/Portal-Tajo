import * as usrsActions from './usersActions';
import * as prmsnsActions from './permissionsActions';
import * as rlsActions from './rolesActions';

export const usersActions = usrsActions;
export const rolesActions = rlsActions;
export const permissionsActions = prmsnsActions;

export const USERS_MANAGER_READY_STATE_CHANGE = 'change ready state of Users Manager';

export const fetchRolesAndPermissions = () => (dispatch) => {
  dispatch(_changeReadyState('loading'));

  return dispatch(prmsnsActions.fetchPermissions())
    .then(() => dispatch(rlsActions.fetchRoles()))
    .then(() => dispatch(usrsActions.fetchUsers()))
    .then(() => dispatch(_changeReadyState('ready')))
    .catch(() => dispatch(_changeReadyState('error')));
};

const _changeReadyState = nextState => ({
  type: USERS_MANAGER_READY_STATE_CHANGE,
  nextState,
});
