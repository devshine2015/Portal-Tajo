import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { VelocityTransitionGroup } from 'velocity-react';
require('velocity-animate');
require('velocity-animate/velocity.ui');

import ItemProperty from '../DetailItemProperty';
import Divider from 'material-ui/Divider';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import { red500, yellow600, yellow700, } from 'material-ui/styles/colors';


import stylesBase from '../styles.css';
import styles from './styles.css';

// import stylesBasic from './../styles.css';

class ListItemVehicle extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isExpanded !== nextProps.isExpanded
    || this.props.speed.toFixed(1) !== nextProps.speed.toFixed(1)
    || this.props.isZombie !== nextProps.isZombie
    || this.props.isDead !== nextProps.isDead
    ;
  }
  onClick = () => {
    this.props.onClick(this.props.id);
  }

  inActivityIndicator() {
    if (!this.props.isZombie && !this.props.isDead) {
      return null;
    }

    const updateTime = new Date(this.props.lastUpdateSinceEpoch);
    let infoStr = 'newer reported - check device';

    if (!this.props.isDead) {
      infoStr = this.props.isExpanded ?
        `${updateTime.toLocaleString()}` :
        `last update ${updateTime.toDateString()}`;
    }
  //        value={`updated ${updateTime.toLocaleString()}`}
    return (
      <ItemProperty
        title=""
        value={infoStr}
        icon={<AlertIcon color={yellow700} />}
      />
    );
  }
  // <ItemProperty
  //   key="dist"
  //   title="Trip dist"
  //   value={`${(this.props.dist.lastTrip / 1000).toFixed(2)} km`}
  // />

  renderDetails() {
    if (this.props.isExpanded) {
      return (<div>
        <Divider key="line01" />
        <ItemProperty
          key="speed"
          title="Speed"
          value={`${this.props.speed.toFixed(1)} km/h`}
        />
        {this.props.temp === undefined ? '' :
          <ItemProperty
            key="temp"
            title="Temperature"
            value={this.props.temp.toFixed(1)+'\xB0 C'}
          />
        }
        <Divider key="line02" />
        <ItemProperty
          key="license"
          title="license Plate"
          value={`${this.props.licensePlate}`}
        />
        <ItemProperty
          key="make"
          title="Make"
          value={`${this.props.make}`}
        />
        <ItemProperty
          key="model"
          title="Model"
          value={`${this.props.model}`}
        />
        <ItemProperty
          key="year"
          title="Year"
          value={`${this.props.year}`}
        />
      </div>);
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
        <h1>
          {this.props.name}
        </h1>
        <VelocityTransitionGroup
          enter={{ animation: 'fadeIn', duration: 150 }}
          leave={{ animation: 'fadeOut', duration: 500 }}
        >
          {this.inActivityIndicator()}
        </VelocityTransitionGroup>
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 500 }}
          leave={{ animation: 'slideUp', duration: 350 }}
        >
          {this.renderDetails()}
        </VelocityTransitionGroup>
      </div>
    );
  }
}
// enter={{ animation: 'transition.slideRightIn', duration: 500 }}

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
  temp: React.PropTypes.number,
  dist: React.PropTypes.object,
  licensePlate: React.PropTypes.string,
  make: React.PropTypes.string,
  model: React.PropTypes.string,
  year: React.PropTypes.string,
};

const PureListItemVehicle = pure(ListItemVehicle);

export default PureListItemVehicle;
