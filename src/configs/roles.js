import { portal } from 'configs';

export const ABILITIES = {
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
};

const rolesAbilities = {
  escape: {
    superadmin: {
      USERS_SEE: true,
      USERS_ADD_ANY: true,
      USERS_EDIT_ANY: true,
      USERS_DELETE_ANY: true,
    },
    admin: {
      USERS_SEE: true,
      USERS_ADD_MANAGER: true,
      USERS_ADD_INSTALLER: true,
      USERS_EDIT_MANAGER: true,
      USERS_EDIT_INSTALLER: true,
      USERS_DELETE_MANAGER: true,
      USERS_DELETE_INSTALLER: true,
    },
    manager: {
      USERS_SEE: true,
      USERS_ADD_INSTALLER: true,
      USERS_EDIT_INSTALLER: true,
      USERS_DELETE_INSTALLER: true,
    },
    installer: {},
  },

  portal: {
    admin: {},
    manager: {},
    installer: {},
  },
};

export function checkRoleAbility(role, ability) {
  return rolesAbilities[portal][role][ability];
}

export default {
  ABILITIES,
  checkRoleAbility,
};
