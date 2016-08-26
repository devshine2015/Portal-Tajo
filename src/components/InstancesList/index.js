import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import SimpleItem from './Simple';
import CheckboxItem from './WithCheckboxes';
import DetailedGFItem from './WithDetails/gf';
import DetailedVehicleItem from './WithDetails/vehicle';
import addCSSRule from 'utils/cssRule';
import types from './types';

import styles from './styles.css';

let isStyleSheetRuleAdded = false;

function chooseItem(type, {
  onItemClick,
  selectedItems,
  currentExpandedItem,
  item,
}) {
  const isExpanded = currentExpandedItem && item.id === currentExpandedItem;
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
      return (
        <DetailedVehicleItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          {...item}
        />
      );
    }
    case types.withLocationDetails: {
      return (
        <DetailedGFItem
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
}, context) => {
  // temporary solution.
  // TODO -- use LESS/SASS for such things
  if (!isStyleSheetRuleAdded) {
    isStyleSheetRuleAdded = true;
    addCSSRule('.listItemDynamicExpanded',
      'background-color: ' + context.muiTheme.palette.PLItemBackgroundColorExpanded, 0);
    addCSSRule('.listItemDynamicExpanded:hover',
      'background-color: ' + context.muiTheme.palette.PLItemBackgroundColorExpanded, 0);
    addCSSRule('.listItemDynamic',
      'background-color: ' + context.muiTheme.palette.PLItemBackgroundColor + ';' +
      'color: ' + context.muiTheme.palette.PLItemColor, 0 );
//      'border-right: 3px solid ' + context.muiTheme.palette.PLItemBackgroundColorExpanded, 0 );
      // + ';' +
      // 'border-left: 3px solid ' + context.muiTheme.palette.PLItemBackgroundColor, 0);
    addCSSRule('.listItemDynamic:hover',
      'background-color: ' + context.muiTheme.palette.PLItemBackgroundColorHover, 0);
  //    'background-color: ${context.muiTheme.palette.PLItemBackgroundColorHover}', 0);
  }

  const items = data.map(item => {
    if (item.filteredOut) {
      return null;
    }

    const isExpanded = currentExpandedItem && item.id === currentExpandedItem;
    const className = classnames(styles.list__item, 'listItemDynamic', {
      ['listItemDynamicExpanded']: isExpanded,
      [styles.list__item_expanded]: isExpanded,
    });
    const onClick = () => {
      onItemClick(item.id, !isExpanded);
    };
    // style={ { color: context.muiTheme.palette.PLItemColor } }
    return (<li
      className={className}
      key={item.id}
      onClick={onClick}
    >
      {chooseItem(type, {
        onItemClick,
        item,
        selectedItems,
        currentExpandedItem,
        ...rest,
      })}
    </li>
  );});
  return (
    <ul className={styles.list}>
      {items}
    </ul>
  );
};

InstancesList.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
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
