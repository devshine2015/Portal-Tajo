import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
// import ListItem from './../ListItem';
import ListItemVehicle from './../listItems/Vehicle';
import ListItemLocation from './../listItems/GF';
import PowerFilter from './../PowerFilter';
import styles from './styles.css';
import * as ListEvents from 'containers/PowerList/events';
import * as MapEvents from 'containers/MapFleet/events';
import * as ListTypes from './../../types';

const selectForMe = (meThis, hookId) => (id) => {
  meThis.onSelect(hookId, id);
};

class ListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemId: undefined,
    };
    switch (props.type) {
      case ListTypes.LIST_VEHICLES:
        props.setUpHooks(MapEvents.MAP_VEHICLE_SELECTED,
          selectForMe(this, ListEvents.LIST_VEHICLE_SELECTED));
        break;
      case ListTypes.LIST_GF:
        props.setUpHooks(MapEvents.MAP_GF_SELECTED,
          selectForMe(this, ListEvents.LIST_GF_SELECTED));
        break;
      default:
    }
  }

  onSelect(hookId, id) {
    // if(this.state.selectedItemId === id) {
    //   return;
    // }
    this.props.hooks(hookId, id);
    this.setState({ selectedItemId: id });
  }
  itemSelectedCallback(itemNode) {
    const listDOMNode = ReactDOM.findDOMNode(this);
    // console.log('selected callback LIST '+listDOMNode.scrollTop);
    // console.log('selected callback ITEM '+itemNode.offsetTop);
  }
  render() {
    if (this.props.items.size === 0) return null;

    let itemCreator = null;
    switch (this.props.type) {
      case ListTypes.LIST_VEHICLES:
        itemCreator = (v) => (
          <li key={v.id}>
            <ListItemVehicle
              vehicleObj={v}
              onClick={selectForMe(this, ListEvents.LIST_VEHICLE_SELECTED)}
              isSelected={this.state.selectedItemId === v.id}
              onSelectedCallback={this.itemSelectedCallback}
            />
          </li>);
        break;
      case ListTypes.LIST_GF:
        itemCreator = (v) => (
          <li key={v.id}>
            <ListItemLocation
              locationObj={v}
              hooks={this.props.hooks}
              onClick={selectForMe(this, ListEvents.LIST_GF_SELECTED)}
              isSelected={this.state.selectedItemId === v.id}
            />
          </li>);
        break;
      default: return null;
    }

    if (itemCreator === null) return false;

    const items = this.props.items.map((v) => (v.filteredOut ? false : itemCreator(v)), this);
    return (
      <div className={styles.listBoxTopContainer}>
        <PowerFilter type={this.props.type} items={this.props.items} />
        <ul className={styles.listBoxList}>
          {items}
        </ul>
      </div>
    );
  }
}

ListBox.propTypes = {
  type: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  hooks: React.PropTypes.func.isRequired,
  setUpHooks: React.PropTypes.func.isRequired,
};

const PureListBox = pure(ListBox);

export default PureListBox;
