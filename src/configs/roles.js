import { portal } from 'configs';

const uber = 'uber';
const admin = 'admin';
const manager = 'manager';
const installer = 'installer';

export default {
  uber,
  admin,
  manager,
  installer,
};

export const rolesEnum = [
  '', uber, admin, manager, installer,
];

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
  DEVICES_ATTACH: 'able attach device to vehicle',
  DEVICES_DETACH: 'able detach device from vehicle',
  /* end of devices management */

  /* vehicles management abilities */
  VEHICLE_DISABLE: 'able to disable vehicle',
  /* end of vehicles management */
};

const uberAbilities = {
  [permissions.USERS_SEE]: true,
  [permissions.USERS_ADD_ANY]: true,
  [permissions.USERS_EDIT_ANY]: true,
  [permissions.USERS_DELETE_ANY]: true,
  [permissions.DEVICES_SEE]: true,
  [permissions.DEVICES_CREATE]: true,
  [permissions.DEVICES_DEACTIVATE]: true,
  [permissions.DEVICES_DETACH]: true,
  [permissions.DEVICES_ATTACH]: true,
  [permissions.VEHICLE_DISABLE]: true,
};

const rolesAbilities = {
  tajo: {
    [uber]: uberAbilities,
    [admin]: {
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
      [permissions.VEHICLE_DISABLE]: true,
    },
    [manager]: {
      [permissions.USERS_SEE]: true,
      [permissions.USERS_ADD_INSTALLER]: true,
      [permissions.USERS_EDIT_INSTALLER]: true,
      [permissions.USERS_DELETE_INSTALLER]: true,
      [permissions.DEVICES_SEE]: true,
      [permissions.DEVICES_CREATE]: true,
    },
    [installer]: {
      [permissions.DEVICES_SEE]: true,
    },
  },

  portal: {
    [uber]: uberAbilities,
    [admin]: {
      [permissions.DEVICES_SEE]: true,
    },
    [manager]: {
      [permissions.DEVICES_SEE]: true,
    },
    [installer]: {},
  },
};

export function checkRolePermissions(role, permission) {
  return rolesAbilities[portal][role][permission];
}
