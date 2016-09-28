import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import pure from 'recompose/pure';
import { fetchUsers } from 'containers/UsersManager/actions';
import { getUsers } from 'containers/UsersManager/reducer';
import UserItem from '../UserItem';

import styles from './styles.css';

class UsersList extends React.Component {

  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    if (this.props.users.size === 0) {
      return null;
    }

    const users = this.props.users.map(user => (
      <li
        key={user.created}
        className={styles.list__item}
      >
        <UserItem {...user} />
      </li>
    ));

    return (
      <ul className={styles.list}>
        {users}
      </ul>
    );
  }
}

UsersList.propTypes = {
  fetchUsers: React.PropTypes.func.isRequired,
  users: React.PropTypes.instanceOf(List).isRequired,
};

const mapState = state => ({
  users: getUsers(state),
});
const mapDispatch = {
  fetchUsers,
};

const PureUsersList = pure(UsersList);

export default connect(mapState, mapDispatch)(PureUsersList);
