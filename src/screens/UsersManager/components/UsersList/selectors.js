import { List } from 'immutable';
import { createSelector } from 'reselect';
import {
  usersSelectors,
  rolesSelectors,
} from 'services/Users/selectors';

const EMPTY_LIST = new List();

/**
 * @param {ImmutableList} users
 * @param {ImmutableMap} roles
 *
 * @returns {ImmutableList} of users with roles
 */
const enrichUsersWithRoles = (users, roles) => {
  if (users.size === 0 || roles.size === 0) return EMPTY_LIST;
  let nextUsers = users;

  roles.toArray().forEach((role) => {
    const roleUsers = role.has('users') ? role.get('users') : EMPTY_LIST;

    nextUsers = nextUsers.map((user) => {
      const userId = user.get('user_id');

      if (roleUsers.includes(userId)) {
        const nextUser = user.set('role', role.get('name'));

        return nextUser;
      }

      return user;
    });
  });

  return nextUsers;
};

export const makeGetUsersInfo = () =>
  createSelector([usersSelectors.getUsers, rolesSelectors.getRoles], enrichUsersWithRoles);
