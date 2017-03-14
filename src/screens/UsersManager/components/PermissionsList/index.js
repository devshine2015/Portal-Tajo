import React from 'react';
import { css } from 'aphrodite/no-important';
import { List } from 'immutable';
import { connect } from 'react-redux';
import PermissionsItem from '../PermissionsItem';
import { getPermissions } from 'services/Users/reducer';
import { permissionsActions } from 'services/Users/actions';

import classes from './classes';

class PermissionsList extends React.Component {

  onPermissionDelete = index => {
    this.props.deletePermission(index);
  }

  renderPermissions() {
    return this.props.allPermissions.map((perm, i) => (
      <li
        className={css(classes.list__item)}
        key={i}
      >
        <PermissionsItem
          data={perm}
          index={i}
          onDelete={this.onPermissionDelete}
        />
      </li>
    ));
  }

  render() {
    return (
      <ul className={css(classes.list)}>
        { this.renderPermissions() }
      </ul>
    );
  }
}

PermissionsList.propTypes = {
  allPermissions: React.PropTypes.instanceOf(List).isRequired,
  deletePermission: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  allPermissions: getPermissions(state),
});
const mapDispatch = {
  deletePermission: permissionsActions.deletePermission,
};

export default connect(mapState, mapDispatch)(PermissionsList);
