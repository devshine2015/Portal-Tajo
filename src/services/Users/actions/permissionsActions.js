import uuid from 'node-uuid';

export const PERMISSIONS_FETCH_SUCCESS = 'services/usersManager/PERMISSIONS_FETCH_SUCCESS';
export const PERMISSIONS_CREATE = 'services/UsersManager/PERMISSIONS_CREATE';
export const PERMISSIONS_DELETE = 'services/UsersManager/PERMISSIONS_DELETE';

export const createPermission = payload => ({
  type: PERMISSIONS_CREATE,
  id: uuid.v4(),
  permission: payload,
});

export const deletePermission = index => ({
  type: PERMISSIONS_DELETE,
  index,
});
