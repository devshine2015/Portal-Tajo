import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import ItemProperty from '../DetailItemProperty';

import styles from '../styles.css';
import styles2 from './styles.css';

class ListItemWithDetails extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.id, !this.props.isExpanded);
  }

  renderDetails() {
    if (this.props.isExpanded) {
      return [
        <div key="name">
          {this.props.name}
        </div>,
        <hr
          className={styles2.line}
          key="line1"
        />,
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
        <hr
          className={styles2.line}
          key="line2"
        />,
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

    return this.props.name;
  }

  render() {
    const className = classnames(styles.listItemInn, {
      [styles2.listItemInn_expanded]: this.props.isExpanded,
    });

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        { this.renderDetails() }
      </div>
    );
  }
}

ListItemWithDetails.propTypes = {
  id: React.PropTypes.string.isRequired,
  isExpanded: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  speed: React.PropTypes.number,
  dist: React.PropTypes.object,
  licensePlate: React.PropTypes.string,
  make: React.PropTypes.string,
  model: React.PropTypes.string,
  year: React.PropTypes.string,
};

export default pure(ListItemWithDetails);
