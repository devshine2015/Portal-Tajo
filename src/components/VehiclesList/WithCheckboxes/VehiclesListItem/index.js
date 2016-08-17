import React from 'react';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';

const STYLES = {
  labelStyle: {
    color: '#777',
  },
};

const ListItemWithCheckbox = ({
  id,
  name,
  onClick,
}) => (
  <div className="vehicles-list_item">
    <Checkbox
      onCheck={onClick}
      label={name}
      labelStyle={STYLES.labelStyle}
      name={id}
    />
  </div>
);

ListItemWithCheckbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default pure(ListItemWithCheckbox);
