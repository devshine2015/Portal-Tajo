import React from 'react';
import pure from 'recompose/pure';
import ListItem from './../ListItem';
import PowerFilter from './../PowerFilter';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import styles from './styles.css';

//        <PowerFilter />


class ListBox extends React.Component {
  render() {
    if (this.props.vehicles.size === 0) {
      return null;
    }

    const items = this.props.vehicles.map((v) => (
      <li key={v.id}>
        <ListItem title= { v.name} />
      </li>
    ));
    return (
      <div className={styles.listBoxTopContainer}>
        <PowerFilter />
        <ul className={styles.listBoxList}>
          {items}
        </ul>
      </div>
    );
  }
}

ListBox.propTypes = {
  vehicles: React.PropTypes.object.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehicles(state),
});

const PureListBox = pure(ListBox);

export default connect(mapState)(PureListBox);
