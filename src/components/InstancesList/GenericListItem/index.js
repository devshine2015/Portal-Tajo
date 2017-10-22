import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import classnames from 'classnames';
import dateFormats from 'configs/dateFormats';
import SimpleItem from '../Simple';
import CheckboxItem from '../WithCheckboxes';
import DetailedGFItem from '../WithDetails/gf';
import DetailedVehicleItem from '../WithDetails/vehicle';
import VehicleChronicleItem from '../WithDetails/vehicleChronicle';
import VehicleExecItem from '../WithDetails/vehicleExecReport';
import MaritimeItem from '../WithDetails/maritime';
import MWAJobWithDetails from '../WithDetails/MWA';
import StatusIcon from './StatusIcon';
import types from '../types';

import styles from './styles.css';

function _needIndicator(noIndicator, item) {
  if (noIndicator) return false;

  const itIsTransport = item.hasOwnProperty('activityStatus');

  if (!itIsTransport) return false;

  return item.activityStatus !== 'ok' || item.isDelayedWithIgnitionOff;
}

function chooseItem(type, {
  onItemClick,
  selectedItems,
  isExpanded,
  translations,
  item,
}) {
  switch (type) {
    case types.withCheckboxes: {
      const isChecked = selectedItems.indexOf(item.id) !== -1;

      return (
        <CheckboxItem
          id={item.id}
          name={item.original.name}
          onClick={onItemClick}
          translations={translations}
          isChecked={isChecked}
        />
      );
    }
    case types.withVehicleDetails: {
      return (
        <DetailedVehicleItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          translations={translations}
          vehicle={item}
        />
      );
    }
    case types.withGFDetails: {
      return (
        <DetailedGFItem
          isExpanded={isExpanded}
          translations={translations}
          gf={item}
        />
      );
    }
    case types.vehicleChronicle: {
      return (
        <VehicleChronicleItem
          id={item.id}
          isExpanded={isExpanded}
          vehicle={item}
          translations={translations}
        />
      );
    }
    case types.vehicleExecReport: {
      return (
        <VehicleExecItem
          id={item.id}
          isExpanded={isExpanded}
          vehicle={item}
          translations={translations}
        />
      );
    }
    case types.maritime: {
      return (
        <MaritimeItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          translations={translations}
          vehicle={item}
        />
      );
    }
    case types.mwaJob: {
      return (
        <MWAJobWithDetails
          isExpanded={isExpanded}
          translations={translations}
          mwaJobObject={item}
        />
      );
    }
    default:
      return (
        <SimpleItem
          id={item.id}
          name={item.original ? item.original.name : item.name}
          translations={translations}
          onClick={onItemClick}
        />
      );
  }
}

class GenericListItem extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.isExpanded && nextProps.isExpanded) {
      this.scrollIntoView();
    }
  }

  node = null;

  scrollIntoView() {
    if (!this.props.scrollIntoView) return;

    if (this.node.scrollIntoViewIfNeeded) {
      // Works for chrome.
      // true - the element will be aligned so it is centered within
      // the visible area of the scrollable ancestor.
      this.node.scrollIntoViewIfNeeded(true);
    } else {
      // behaviour works in ff
      this.node.scrollIntoView({
        behaviour: 'smooth',
      });
    }
  }

  saveNode = (node) => {
    this.node = node;
  }

  render() {
    const { isExpanded, ...rest } = this.props;
    const { muiTheme } = this.context;
    const className = classnames(styles.list__item, 'listItemDynamic', {
      listItemDynamicExpanded: isExpanded,
      // [styles.list__item_expanded]: isExpanded,
    });

    const element = chooseItem(this.props.type, { ...rest, isExpanded });
    return (
      <li
        className={className}
        ref={this.saveNode}
        style={{
          backgroundColor: isExpanded ? muiTheme.powerList.activeItemColor : muiTheme.powerList.itemColor,
          color: (isExpanded && muiTheme.powerList.activeItemTextColor) ? muiTheme.powerList.activeItemTextColor : muiTheme.powerList.itemTextColor,
        }}
      >
        { _needIndicator(rest.noDefaultActivityIndicator, rest.item) && (
          <StatusIcon
            activityStatus={rest.item.activityStatus}
            isDelayedWithIgnitionOff={rest.item.isDelayedWithIgnitionOff}
          />
        )}
        {element}
      </li>
    );
  }
}

GenericListItem.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

GenericListItem.propTypes = {
  item: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func,
  dateFormat: PropTypes.string,
  selectedItems: PropTypes.array,
  scrollIntoView: PropTypes.bool,
  uncheckOnUnmount: PropTypes.bool,
  noDefaultActivityIndicator: PropTypes.bool,
  customIndicatorRender: PropTypes.func,

  type: PropTypes.oneOf([
    types.withCheckboxes,
    types.withVehicleDetails,
    types.withGFDetails,
    types.vehicleChronicle,
    types.vehicleExecReport,
    types.maritime,
    types.simple,
  ]),
};

GenericListItem.defaultProps = {
  dateFormat: dateFormats.default.value,
  type: types.simple,
  noDefaultActivityIndicator: false,
  customIndicatorRender: null,
};

export default pure(GenericListItem);
