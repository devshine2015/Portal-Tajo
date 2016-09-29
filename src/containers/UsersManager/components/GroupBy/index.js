import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  RadioButton,
  RadioButtonGroup,
} from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import { getGroupBy } from 'containers/UsersManager/reducer';
import { changeGroupBy } from 'containers/UsersManager/actions';

import styles from './styles.css';

const GroupBy = ({
  defaultGroupBy,
  onGroupByChange,
}) => (
  <div className={styles.wrapper}>
    <Subheader>Group By:</Subheader>
    <RadioButtonGroup
      name="groupBy"
      defaultSelected={defaultGroupBy}
      onChange={onGroupByChange}
    >
      <RadioButton
        value="fleet"
        label="Fleet"
      />
      <RadioButton
        value="role"
        label="Role"
      />
    </RadioButtonGroup>
  </div>
);

GroupBy.propTypes = {
  defaultGroupBy: React.PropTypes.oneOf([
    'fleet', 'role',
  ]).isRequired,
  onGroupByChange: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  defaultGroupBy: getGroupBy(state),
});
const mapDispatch = dispatch => ({
  onGroupByChange: (e, value) => dispatch(changeGroupBy(value)),
});

export default connect(mapState, mapDispatch)(pure(GroupBy));
