import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import ItemProperty from './../ItemProperty';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import { red500 } from 'material-ui/styles/colors';


import stylesBasic from './../styles.css';

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
    || this.props.vehicleObj.speed.toFixed(1) !== nextProps.vehicleObj.speed.toFixed(1)
    || this.props.vehicleObj.isZombie !== nextProps.vehicleObj.isZombie
    || this.props.vehicleObj.isDead !== nextProps.vehicleObj.isDead
    ;
  }
  onClick = () => {
    this.props.onClick(this.props.vehicleObj.id);
  }
  inActivityIndicator(expanded) {
    if (!this.props.vehicleObj.isZombie && !this.props.vehicleObj.isDead) return null;
    const updateTime = new Date(this.props.vehicleObj.lastUpdateSinceEpoch);
    let infoStr = 'newer reported - check device';
    if (!this.props.vehicleObj.isDead) {
      infoStr = expanded ?
        'updated ' + updateTime.toLocaleString()
        :
        'last update ' + updateTime.toDateString();
    }
  //        value={`updated ${updateTime.toLocaleString()}`}
    return (
      <ItemProperty title="" icon={<AlertIcon color={red500} />}
        value={infoStr}
      />
    );
  }
  render() {
    // collapsed view
    if (!this.props.isSelected) {
      return (
        <div
          className={stylesBasic.listItem}
          onClick={this.onClick}
        >
          <div > {this.props.vehicleObj.name} </div>
          {this.inActivityIndicator(false)}
        </div>
      );
    }

    return (
      <div
        className={stylesBasic.listItemSelected}
        onClick={this.onClick}
      >
        <div > {this.props.vehicleObj.name} </div>
        {this.inActivityIndicator(true)}
        <hr />
        <ItemProperty title="Speed" value={`${this.props.vehicleObj.speed.toFixed(1)} km/h`} />
        <ItemProperty title="Trip dist" value={`${(this.props.vehicleObj.dist.lastTrip / 1000).toFixed(2)} km`} />
        <hr />
        <ItemProperty title="Kind" value={this.props.vehicleObj.kindData.text} />
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
