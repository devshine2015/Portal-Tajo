import React from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import pure from 'recompose/pure';
import Subheader from 'material-ui/Subheader';
import { fetchUsers } from 'services/Users/actions';
import {
  getUsers,
  getGrouping,
  getGroupBy,
} from 'services/Users/reducer';
import UserItem from '../UserItem';

import styles from './styles.css';

const STYLES = {
  subheader: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
};

function renderUsers(groupIndexies, allUsers) {
  return groupIndexies.map(index => {
    const user = allUsers.get(index);

    return (
      <li
        key={index}
        className={styles.list__item}
      >
        <UserItem {...user} />
      </li>
    );
  });
}

function renderGroups(grouping, users) {
  const groups = grouping.keys();
  const k = [];
  for (let group of groups) {
    // get indexies of users from group
    const groupUsers = grouping.get(group);

    k.push(
      <div
        className={styles.group}
        key={group}
      >
        <Subheader style={STYLES.subheader}>{group}</Subheader>
        <ul className={styles.list}>
          { renderUsers(groupUsers, users) }
        </ul>
      </div>
    );
  }

  return k;
}

class UsersList extends React.Component {

  componentWillMount() {
    this.props.fetchUsers(this.props.groupBy);
  }

  render() {
    if (this.props.users.size === 0) {
      return null;
    }

    const groups = renderGroups(this.props.currentGrouping, this.props.users);

    return (
      <div className={styles.groups}>
        { groups }
      </div>
    );
  }
}

UsersList.propTypes = {
  groupBy: React.PropTypes.oneOf([
    'fleet', 'role',
  ]).isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  users: React.PropTypes.instanceOf(List).isRequired,
  currentGrouping: React.PropTypes.instanceOf(Map).isRequired,
};

const mapState = state => ({
  users: getUsers(state),
  currentGrouping: getGrouping(state),
  groupBy: getGroupBy(state),
});
const mapDispatch = {
  fetchUsers,
};

const PureUsersList = pure(UsersList);

export default connect(mapState, mapDispatch)(PureUsersList);
