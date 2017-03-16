import uuid from 'node-uuid';

export const PERMISSIONS_FETCH_SUCCESS = 'services/usersManager/PERMISSIONS_FETCH_SUCCESS';
export const PERMISSION_CREATE = 'services/UsersManager/PERMISSION_CREATE';
export const PERMISSION_DELETE = 'services/UsersManager/PERMISSION_DELETE';

export const createPermission = payload => {
  payload.id = uuid.v4();

  return ({
    type: PERMISSION_CREATE,
    permission: payload,
  });
};

export const deletePermission = index => ({
  type: PERMISSION_DELETE,
  index,
});
