import uuid from 'node-uuid';

export const ROLES_FETCH_SUCCESS = 'services/usersManager/ROLES_FETCH_SUCCESS';
export const ROLE_CREATE = 'services/UsersManager/ROLE_CREATE';
export const ROLE_DELETE = 'services/UsersManager/ROLE_DELETE';

export const createRole = payload => {
  payload.id = uuid.v4();

  return ({
    type: ROLE_CREATE,
    role: payload,
  });
};

export const deleteRole = index => ({
  type: ROLE_DELETE,
  index,
});
