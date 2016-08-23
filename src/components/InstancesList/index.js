import React from 'react';
import pure from 'recompose/pure';
import SimpleItem from './Simple';
import CheckboxItem from './WithCheckboxes';
import DetailedLocationItem from './WithDetails/location';
import DetailedVehicleItem from './WithDetails/vehicle';
import types from './types';

import styles from './styles.css';

function chooseItem(type, {
  onItemClick,
  selectedItems,
  currentExpandedItem,
  item,
}) {
  switch (type) {
    case types.withCheckboxes: {
      const isChecked = selectedItems.indexOf(item.id) !== -1;

      return (
        <CheckboxItem
          id={item.id}
          name={item.name}
          onClick={onItemClick}
          isChecked={isChecked}
        />
      );
    }
    case types.withVehicleDetails: {
      const isExpanded = currentExpandedItem && item.id === currentExpandedItem;

      return (
        <DetailedVehicleItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          {...item}
        />
      );
    }
    case types.withLocationDetails: {
      const isExpanded = currentExpandedItem && item.id === currentExpandedItem;

      return (
        <DetailedLocationItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          {...item}
        />
      );
    }
    default:
      return (
        <SimpleItem
          id={item.id}
          name={item.name}
          onClick={onItemClick}
        />
      );
  }
}

const InstancesList = ({
  onItemClick,
  data,
  type,
  selectedItems = [],
  currentExpandedItem,
  ...rest,
}) => {
  const items = data.map(item => (
    <li
      className={styles.list__item}
      key={item.id}
    >
      {chooseItem(type, {
        onItemClick,
        item,
        selectedItems,
        currentExpandedItem,
        ...rest,
      })}
    </li>
  ));

  return (
    <ul className={styles.list}>
      {items}
    </ul>
  );
};

InstancesList.propTypes = {
  // Main data to display
  data: React.PropTypes.array.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  type: React.PropTypes.oneOf([
    types.withCheckboxes,
    types.withVehicleDetails,
    types.withLocationDetails,
    types.simple,
  ]),
  selectedItems: React.PropTypes.array,

  // Pass to CheckboxItem
  uncheckOnUnmount: React.PropTypes.bool,

  // For DetailedItem
  currentExpandedItem: React.PropTypes.string,
};

export default pure(InstancesList);
