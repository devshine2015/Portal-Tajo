import * as usrsActions from './usersActions';
import * as prmsnsActions from './permissionsActions';
import * as rlsActions from './rolesActions';

export const usersActions = usrsActions;
export const rolesActions = rlsActions;
export const permissionsActions = prmsnsActions;

export const fetchRolesAndPermissions = ({ authorizationExtAPI }) => (dispatch) => {
  // if no access token for authorization extention
  if (!authorizationExtAPI) return Promise.resolve();

  return dispatch(prmsnsActions.fetchPermissions(authorizationExtAPI))
    .then(() => dispatch(rlsActions.fetchRoles(authorizationExtAPI)));
};
