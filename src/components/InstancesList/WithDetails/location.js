import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import ItemProperty from '../DetailItemProperty';

import styles from '../styles.css';
import styles2 from './styles.css';

class LocationWithDetails extends React.Component {

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
          key="address"
          title="Address"
          value={this.props.address}
        />,
        <ItemProperty
          key="radius"
          title="Radius"
          value={this.props.radius}
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

LocationWithDetails.propTypes = {
  id: React.PropTypes.string.isRequired,
  isExpanded: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  pos: React.PropTypes.array.isRequired,
  radius: React.PropTypes.number.isRequired,
  address: React.PropTypes.string.isRequired,
};

export default pure(LocationWithDetails);
