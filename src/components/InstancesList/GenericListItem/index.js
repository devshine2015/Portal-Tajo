import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import classnames from 'classnames';
import SimpleItem from '../Simple';
import CheckboxItem from '../WithCheckboxes';
import DetailedGFItem from '../WithDetails/gf';
import DetailedVehicleItem from '../WithDetails/vehicle';
import VehicleChronicleItem from '../WithDetails/vehicleChronicle';
import MaritimeItem from '../WithDetails/maritime';
import types from '../types';

import styles from './styles.css';

function chooseItem(type, {
  onItemClick,
  selectedItems,
  isExpanded,
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
    case types.withGFDetails: {
      return (
        <DetailedGFItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          {...item}
        />
      );
    }
    case types.vehicleChronicle: {
      return (
        <VehicleChronicleItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          {...item}
        />
      );
    }
    case types.maritime: {
      return (
        <MaritimeItem
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
          name={item.original.name}
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

  scrollIntoView() {
    if (!this.props.scrollIntoView) return;

    const node = ReactDOM.findDOMNode(this);

    if (node.scrollIntoViewIfNeeded) {
      // Works for chrome.
      // true - the element will be aligned so it is centered within
      // the visible area of the scrollable ancestor.
      node.scrollIntoViewIfNeeded(true);
    } else {
      // behaviour works in ff
      node.scrollIntoView({
        behaviour: 'smooth',
      });
    }
  }

  render() {
    const { isExpanded, ...rest } = this.props;
    const className = classnames(styles.list__item, 'listItemDynamic', {
      ['listItemDynamicExpanded']: isExpanded,
      [styles.list__item_expanded]: isExpanded,
    });

    return (
      <li className={className}>
        {chooseItem(this.props.type, { ...rest, isExpanded })}
      </li>
    );
  }
}

GenericListItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  isExpanded: React.PropTypes.bool.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  selectedItems: React.PropTypes.array,
  scrollIntoView: React.PropTypes.bool,
  uncheckOnUnmount: React.PropTypes.bool,

  type: React.PropTypes.oneOf([
    types.withCheckboxes,
    types.withVehicleDetails,
    types.withGFDetails,
    types.vehicleChronicle,
    types.maritime,
    types.simple,
  ]),
};

export default pure(GenericListItem);
