import { portal } from 'configs';

export const permissions = {
  /* user management abilities */
  USERS_SEE: 'able see list of users',

  USERS_ADD_ANY: 'able create any users',
  USERS_ADD_ADMIN: 'able create new admin user',
  USERS_ADD_MANAGER: 'able create new manager user',
  USERS_ADD_INSTALLER: 'able create new installer user',

  USERS_EDIT_ANY: 'able edit any users',
  USERS_EDIT_ADMIN: 'able edit admin users',
  USERS_EDIT_MANAGER: 'able edit manager users',
  USERS_EDIT_INSTALLER: 'able edit installer users',

  USERS_DELETE_ANY: 'able delete any users',
  USERS_DELETE_ADMIN: 'able delete admin users',
  USERS_DELETE_MANAGER: 'able delete manager users',
  USERS_DELETE_INSTALLER: 'able delete installer users',
  /* end of user management */

  /* devices management abilities */
  DEVICES_SEE: 'able see devices list',
  DEVICES_CREATE: 'able create new device',
  DEVICES_DEACTIVATE: 'able deactivate device',
  /* end of devices management */
};

const rolesAbilities = {
  tajo: {
    uber: {
      [permissions.USERS_SEE]: true,
      [permissions.USERS_ADD_ANY]: true,
      [permissions.USERS_EDIT_ANY]: true,
      [permissions.USERS_DELETE_ANY]: true,
      [permissions.DEVICES_SEE]: true,
      [permissions.DEVICES_CREATE]: true,
      [permissions.DEVICES_DEACTIVATE]: true,
    },
    admin: {
      [permissions.USERS_SEE]: true,
      [permissions.USERS_ADD_MANAGER]: true,
      [permissions.USERS_ADD_INSTALLER]: true,
      [permissions.USERS_EDIT_MANAGER]: true,
      [permissions.USERS_EDIT_INSTALLER]: true,
      [permissions.USERS_DELETE_MANAGER]: true,
      [permissions.USERS_DELETE_INSTALLER]: true,
      [permissions.DEVICES_SEE]: true,
      [permissions.DEVICES_CREATE]: true,
      [permissions.DEVICES_DEACTIVATE]: true,
    },
    manager: {
      [permissions.USERS_SEE]: true,
      [permissions.USERS_ADD_INSTALLER]: true,
      [permissions.USERS_EDIT_INSTALLER]: true,
      [permissions.USERS_DELETE_INSTALLER]: true,
      [permissions.DEVICES_SEE]: true,
      [permissions.DEVICES_CREATE]: true,
    },
    installer: {
      [permissions.DEVICES_SEE]: true,
    },
  },

  portal: {
    admin: {},
    manager: {},
    installer: {},
  },
};

export function checkRolePermissions(role, permission) {
  return rolesAbilities[portal][role][permission];
}

export default {
  permissions,
  checkRolePermissions,
};
