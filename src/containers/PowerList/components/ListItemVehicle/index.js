import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import ItemProperty from './../ItemProperty';

import styles from './styles.css';

class ListItemVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.myDOMNode = null;
  }
  componentDidMount() {
    this.myDOMNode = ReactDOM.findDOMNode(this);
  }
  shouldComponentUpdate(nextProps) {
    return this.props.isSelected !== nextProps.isSelected
    || this.props.vehicleObj.speed.toFixed(1) !== nextProps.vehicleObj.speed.toFixed(1);
  }
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
    this.props.onSelectedCallback(this.myDOMNode);
    return (
      <div
        className={ this.props.isSelected ? styles.listItemSelected : styles.listItem}
        onClick={this.onClick}
      >
        <div > {this.props.vehicleObj.name} </div>
        <hr />
        <ItemProperty title="Speed" value={`${this.props.vehicleObj.speed.toFixed(1)} km/h`} />
        <ItemProperty title="Trip dist" value={`${(this.props.vehicleObj.dist.lastTrip / 1000).toFixed(2)} km`} />
        <hr />
        <ItemProperty title="license Plate" value={`${this.props.vehicleObj.licensePlate}`} />
        <ItemProperty title="Make" value={`${this.props.vehicleObj.make}`} />
        <ItemProperty title="Model" value={`${this.props.vehicleObj.model}`} />
        <ItemProperty title="Year" value={`${this.props.vehicleObj.year}`} />
      </div>
    );
  }
}

ListItemVehicle.propTypes = {
  vehicleObj: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  onSelectedCallback: React.PropTypes.func.isRequired,

};

const PureListItemVehicle = pure(ListItemVehicle);

export default PureListItemVehicle;
