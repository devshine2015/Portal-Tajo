import * as usrsActions from './usersActions';
import * as prmsnsActions from './permissionsActions';
import * as rlsActions from './rolesActions';

export const usersActions = usrsActions;
export const rolesActions = rlsActions;
export const permissionsActions = prmsnsActions;

export const USERS_MANAGER_TOKENS_READY_STATE_CHANGE = 'Users Manager: change ready state of tokens';
export const USERS_MANAGER_PERMS_ROLES_READY_STATE_CHANGE = 'Users Manager: change ready state of perms&roles';

export const fetchRolesAndPermissions = () => (dispatch) => {
  dispatch(_changeRolesReadyState(false));

  return dispatch(prmsnsActions.fetchPermissions())
    .then(() => dispatch(rlsActions.fetchRoles()))
    .then(() => dispatch(usrsActions.fetchUsers()))
    .then(() => dispatch(_changeRolesReadyState(true)))
    .catch(() => dispatch(_changeRolesReadyState(false)));
};

const _changeRolesReadyState = nextState => ({
  type: USERS_MANAGER_PERMS_ROLES_READY_STATE_CHANGE,
  nextState,
});
