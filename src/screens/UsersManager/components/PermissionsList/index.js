import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { List } from 'immutable';
import { connect } from 'react-redux';
import PermissionsItem from '../PermissionsItem';
import { getPermissions } from 'services/Users/reducer';
import { permissionsActions } from 'services/Users/actions';

import classes from './classes';

const ListHeader = () => (
  <li className={css(classes.list__header)}>
    <div className={css(classes.header)}>
      <div className={css(classes.header__name)}>name</div>
      <div className={css(classes.header__desc)}>description</div>
      <div className={css(classes.header__acton)}>action</div>
    </div>
  </li>
);

class PermissionsList extends React.Component {

  componentWillMount() {
    if (this.props.allPermissions === undefined) {
      if (this.props.showForm) {
        this.props.showForm();
      }
    }
  }

  onPermissionDelete = index => {
    this.props.deletePermission(index);
  }

  renderPermissions() {
    if (this.props.allPermissions === undefined) return null;

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
    if (this.props.allPermissions === undefined) {
      return null;
    }

    return (
      <ul className={css(classes.list)}>
        <ListHeader />
        { this.renderPermissions() }
      </ul>
    );
  }
}

PermissionsList.propTypes = {
  allPermissions: PropTypes.instanceOf(List),
  deletePermission: PropTypes.func.isRequired,
  showForm: PropTypes.func,
};

const mapState = state => ({
  allPermissions: getPermissions(state),
});
const mapDispatch = {
  deletePermission: permissionsActions.deletePermission,
};

export default connect(mapState, mapDispatch)(PermissionsList);
