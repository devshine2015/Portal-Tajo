import React from 'react';
import { Map } from 'immutable';
import { css } from 'aphrodite/no-important';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';

import classes from './classes';

const DeleteButton = ({
  onClick,
}) => (
  <IconButton
    tooltip="Delete"
    onClick={onClick}
  >
    <DeleteIcon color="red" />
  </IconButton>
);

DeleteButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

const PermissionsItem = ({
  data,
  index,
  onDelete,
}) => (
  <div className={css(classes.permission)}>
    <div className={css(classes.permission__name)}>
      { data.get('name') }
    </div>
    <div className={css(classes.permission__desc)}>
      { data.get('desc') }
    </div>
    <div className={css(classes.permission__actions)}>
      <DeleteButton onClick={() => onDelete(index)} />
    </div>
  </div>
);

PermissionsItem.propTypes = {
  data: React.PropTypes.instanceOf(Map).isRequired,
  index: React.PropTypes.number.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default PermissionsItem;
