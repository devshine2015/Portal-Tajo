import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import ItemProperty from '../DetailItemProperty';
import Divider from 'material-ui/Divider';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import { red500 } from 'material-ui/styles/colors';


import stylesBase from '../styles.css';
import styles from './styles.css';

// import stylesBasic from './../styles.css';

class ListItemVehicle extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   return this.props.isExpanded !== nextProps.isExpanded
  //   || this.props.speed.toFixed(1) !== nextProps.speed.toFixed(1)
  //   || this.props.isZombie !== nextProps.isZombie
  //   || this.props.isDead !== nextProps.isDead
  //   ;
  // }
  onClick = () => {
    this.props.onClick(this.props.id, !this.props.isExpanded);
  }

  inActivityIndicator() {
    if (!this.props.isZombie && !this.props.isDead) {
      return null;
    }

    const updateTime = new Date(this.props.lastUpdateSinceEpoch);
    let infoStr = 'newer reported - check device';

    if (!this.props.isDead) {
      infoStr = this.props.isExpanded ?
        `updated ${updateTime.toLocaleString()}` :
        `last update ${updateTime.toDateString()}`;
    }
  //        value={`updated ${updateTime.toLocaleString()}`}
    return (
      <ItemProperty
        title=""
        value={infoStr}
        icon={<AlertIcon color={red500} />}
      />
    );
  }

  renderDetails() {
    if (this.props.isExpanded) {
      return [
        <Divider key="line01" />,
        <ItemProperty
          key="speed"
          title="Speed"
          value={`${this.props.speed.toFixed(1)} km/h`}
        />,
        <ItemProperty
          key="dist"
          title="Trip dist"
          value={`${(this.props.dist.lastTrip / 1000).toFixed(2)} km`}
        />,
        <Divider key="line02" />,
        <ItemProperty
          key="license"
          title="license Plate"
          value={`${this.props.licensePlate}`}
        />,
        <ItemProperty
          key="make"
          title="Make"
          value={`${this.props.make}`}
        />,
        <ItemProperty
          key="model"
          title="Model"
          value={`${this.props.model}`}
        />,
        <ItemProperty
          key="year"
          title="Year"
          value={`${this.props.year}`}
        />,
      ];
    }
    return false;
  }

  render() {
    const className = classnames(stylesBase.listItemInn, {
      [styles.listItemInn_expanded]: this.props.isExpanded,
    });
    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        <div>
          {this.props.name}
        </div>
        {this.inActivityIndicator()}
        {this.renderDetails()}
      </div>
    );
  }
}

ListItemVehicle.propTypes = {
  onClick: React.PropTypes.func.isRequired,
//  onSelectedCallback: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  isExpanded: React.PropTypes.bool,
  isZombie: React.PropTypes.bool.isRequired,
  isDead: React.PropTypes.bool.isRequired,
  lastUpdateSinceEpoch: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  speed: React.PropTypes.number,
  dist: React.PropTypes.object,
  licensePlate: React.PropTypes.string,
  make: React.PropTypes.string,
  model: React.PropTypes.string,
  year: React.PropTypes.string,
};

const PureListItemVehicle = pure(ListItemVehicle);

export default PureListItemVehicle;
