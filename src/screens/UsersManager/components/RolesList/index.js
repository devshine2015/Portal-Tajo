import React from 'react';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';

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

const RolesList = () => (
  <ul className={css(classes.list)}>
    <ListHeader />
  </ul>
);

RolesList.propTypes = {
  showForm: React.PropTypes.func,
};

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(RolesList);
