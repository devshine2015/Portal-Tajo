import React from 'react';
import pure from 'recompose/pure';
import GenericListItem from './GenericListItem';
import addCSSRule from 'utils/cssRule';
import types from './types';

import styles from './styles.css';

let isStyleSheetRuleAdded = false;

const InstancesList = ({
  data,
  currentExpandedItemId,
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
    addCSSRule('.listItemGFDynamicExpanded',
      'background-color: ' + context.muiTheme.palette.PLItemGFBackgroundColorExpanded, 0);
    addCSSRule('.listItemGFDynamicExpanded:hover',
      'background-color: ' + context.muiTheme.palette.PLItemGFBackgroundColorExpanded, 0);
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

    const isExpanded = currentExpandedItemId && item.id === currentExpandedItemId;

    return (
      <GenericListItem
        key={item.id}
        isExpanded={Boolean(isExpanded)}
        item={item}
        {...rest}
      />
    );
  });

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
    types.withGFDetails,
    types.simple,
  ]),

  // Pass to CheckboxItem
  uncheckOnUnmount: React.PropTypes.bool,
  selectedItems: React.PropTypes.array,

  // For DetailedItem
  currentExpandedItemId: React.PropTypes.string,

  // scroll item into view if item are selected
  // somwhere else
  scrollIntoView: React.PropTypes.bool,
};

export default pure(InstancesList);
