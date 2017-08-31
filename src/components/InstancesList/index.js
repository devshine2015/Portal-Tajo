import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import GenericListItem from './GenericListItem';
import addCSSRule from 'utils/cssRule';
import dateFormats from 'configs/dateFormats';
import types from './types';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

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
  muiTheme: PropTypes.object.isRequired,
};

InstancesList.propTypes = {
  // Main data to display
  data: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  type: PropTypes.oneOf([
    types.withCheckboxes,
    types.withVehicleDetails,
    types.withGFDetails,
    types.vehicleChronicle,
    types.vehicleExecReport,
    types.maritime,
    types.simple,
    types.mwaJob,
  ]),

  // Pass to CheckboxItem
  uncheckOnUnmount: PropTypes.bool,
  selectedItems: PropTypes.array,

  // For DetailedItem
  currentExpandedItemId: PropTypes.string,

  // scroll item into view if item are selected
  // somwhere else
  scrollIntoView: PropTypes.bool,

  dateFormat: PropTypes.string,

  // translations for all types of lists
  translations: phrasesShape.isRequired,
};

InstancesList.defaultProps = {
  type: types.simple,
  selectedItems: [],
  currentExpandedItemId: undefined,
  scrollIntoView: true,
  dateFormat: dateFormats.default.value,
  translations: phrases,
  onItemClick: undefined,
  uncheckOnUnmount: true,
};

const Pure = pure(InstancesList);

export default translate(phrases)(Pure);
