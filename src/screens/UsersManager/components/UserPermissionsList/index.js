import React from 'react';
import { css } from 'aphrodite/no-important';
import PermissionChip from '../PermissionChip';

import classes from './classes';

class UserPermissionsList extends React.Component {

  onPermissionClick = (permissionId, isActive) => {
    this.props.onPermissionClick(permissionId, this.props.userIndex, isActive);
  }

  renderPermissions() {
    return this.props.allPermissions.map(perm => {
      const userHasThisPermission = this.props.userPermissions.indexOf(perm.id) !== -1;

      return (
        <li
          className={css(classes.list__item)}
          key={perm.id}
        >
          <PermissionChip
            {...perm}
            isActive={userHasThisPermission}
            onClick={this.onPermissionClick}
          />
        </li>
      );
    });
  }

  render() {
    return (
      <div className={css(classes.permissions)}>
        <div className={css(classes.permissions__header)}>
          permissions
        </div>
        <ul className={css(classes.list)}>
          { this.renderPermissions() }
        </ul>
      </div>
    );
  }
}

UserPermissionsList.propTypes = {
  allPermissions: React.PropTypes.array.isRequired,
  userPermissions: React.PropTypes.array.isRequired,
  userIndex: React.PropTypes.number.isRequired,
  onPermissionClick: React.PropTypes.func.isRequired,
};

export default UserPermissionsList;
