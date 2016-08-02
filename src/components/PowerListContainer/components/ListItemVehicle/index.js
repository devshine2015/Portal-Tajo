import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';


class ListItemVehicle extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.vehicleObj.id);
  }
  render() {
    return (
      <div className={styles.listItem} onClick={this.onClick}>
        <div > {this.props.vehicleObj.name} </div>
      </div>
    );
  }
}

ListItemVehicle.propTypes = {
  vehicleObj: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
};

const PureListItemVehicle = pure(ListItemVehicle);

export default PureListItemVehicle;
