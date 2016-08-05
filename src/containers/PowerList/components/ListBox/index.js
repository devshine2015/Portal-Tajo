import React from 'react';
import pure from 'recompose/pure';
// import ListItem from './../ListItem';
import ListItemVehicle from './../ListItemVehicle';
import ListItemLocation from './../ListItemLocation';
import PowerFilter from './../PowerFilter';
import styles from './styles.css';
import * as ListEvents from 'containers/PowerList/events';
import * as MapEvents from 'containers/MapFleet/events';
import * as ListTypes from './../../types';
//        <PowerFilter />

const selectForMe = (meThis, hookId) => (id) => {
  meThis.onSelect(hookId, id);
};

class ListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemId: undefined,
    };
  }

  onSelect(hookId, id) {
    // if(this.state.selectedItemId === id) {
    //   return;
    // }
    this.props.hooks(hookId, id);
    this.setState({ selectedItemId: id });
  }
  render() {
    if (this.props.items.size === 0) {
      return null;
    }
    let mapFunc = null;
    switch (this.props.type) {
      case ListTypes.LIST_VEHICLES:
        this.props.setUpHooks(MapEvents.MAP_VEHICLE_SELECTED,
          selectForMe(this, ListEvents.LIST_VEHICLE_SELECTED));
        mapFunc = (v) => {
            if (v.filteredOut) {
              return false;
            }
            return (
            <li key={v.id}>
              <ListItemVehicle
                vehicleObj={v}
                onClick={selectForMe(this, ListEvents.LIST_VEHICLE_SELECTED)}
                isSelected={this.state.selectedItemId === v.id}
              />
            </li>
          );
          };
        break;
      case ListTypes.LIST_LOCATIONS:
        this.props.setUpHooks(MapEvents.MAP_LOCATION_SELECTED,
          selectForMe(this, ListEvents.LIST_LOC_SELECTED));
        mapFunc = (v) => {
          if (v.filteredOut) {
            return false;
          }
          return (
            <li key={v.id}>
              <ListItemLocation
                locationObj={v}
                onClick={selectForMe(this, ListEvents.LIST_LOC_SELECTED)}
                isSelected={this.state.selectedItemId === v.id}
              />
            </li>
          );
        };
        break;
      default:
    }
    if (mapFunc === null) {
      return false;
    }
    const items = this.props.items.map(mapFunc, this);
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
