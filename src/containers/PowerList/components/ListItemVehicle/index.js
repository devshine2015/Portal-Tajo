import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';

class ListItemVehicle extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.vehicleObj.id);
  }
  render() {
    // collapsed view
    if (!this.props.isSelected) {
      return (
        <div
          className={styles.listItem}
          onClick={this.onClick}
        >
          <div > {this.props.vehicleObj.name} </div>
        </div>
      );
    }
    // selected/exapnded view
    return (
      <div
        className={ this.props.isSelected ? styles.listItemSelected : styles.listItem}
        onClick={this.onClick}
      >
        <div > {this.props.vehicleObj.name} </div>
        <div className={styles.link}>
          {`Speed: ${this.props.vehicleObj.speed.toFixed(2)} km/h`}
        </div>
        <div className={styles.link}>
          {`Trip dist: ${(this.props.vehicleObj.dist.lastTrip / 1000).toFixed(2)} km`}
        </div>
      </div>
    );
  }
}

ListItemVehicle.propTypes = {
  vehicleObj: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};

const PureListItemVehicle = pure(ListItemVehicle);

export default PureListItemVehicle;
