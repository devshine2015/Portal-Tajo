import * as usrsActions from './usersActions';
import * as prmsnsActions from './permissionsActions';
import * as rlsActions from './rolesActions';

export const usersActions = usrsActions;
export const rolesActions = rlsActions;
export const permissionsActions = prmsnsActions;

export const fetchRolesAndPermissions = () => (dispatch) => {
  return dispatch(prmsnsActions.fetchPermissions())
    .then(() => dispatch(rlsActions.fetchRoles()));
};
