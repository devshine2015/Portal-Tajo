import React from 'react';
import pure from 'recompose/pure';
import SimpleListItem from './Simple';
import CheckboxListItem from './WithCheckboxes';

import styles from './styles.css';

const VehiclesList = ({
  onItemClick,
  vehicles,
  withCheckboxes = false,
  selectedItems = [],
  ...rest,
}) => {
  const ListItem = withCheckboxes ? CheckboxListItem : SimpleListItem;

  const items = vehicles.map(v => {
    const isChecked = selectedItems.indexOf(v.id) !== -1;

    return (
      <li
        className={styles.list__item}
        key={v.id}
      >
        <ListItem
          id={v.id}
          name={v.name}
          onClick={onItemClick}
          isChecked={isChecked}
          {...rest}
        />
      </li>
    );
  });

  return (
    <ul className={styles.list}>
      {items}
    </ul>
  );
};

VehiclesList.propTypes = {
  onItemClick: React.PropTypes.func.isRequired,
  vehicles: React.PropTypes.array.isRequired,
  withCheckboxes: React.PropTypes.bool,
  selectedItems: React.PropTypes.array,

  // Pass to CheckboxListItem
  uncheckOnUnmount: React.PropTypes.bool,
};

export default pure(VehiclesList);
