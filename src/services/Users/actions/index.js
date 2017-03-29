import * as usrsActions from './usersActions';
import * as prmsnsActions from './permissionsActions';
import * as rlsActions from './rolesActions';

export const usersActions = usrsActions;
export const rolesActions = rlsActions;
export const permissionsActions = prmsnsActions;

export const fetchRolesAndPermissions = ({ authExtApi }) => dispatch => {
  // if no access token for authorization extention
  if (!authExtApi) return Promise.resolve();

  return dispatch(prmsnsActions.fetchPermissions(authExtApi))
    .then(() => dispatch(rlsActions.fetchRoles(authExtApi)));
};
