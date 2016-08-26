import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import ItemProperty from '../DetailItemProperty';

import styles from '../styles.css';
import styles2 from './styles.css';

class LocationWithDetails extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.id);
  }

  renderDetails() {
    if (this.props.isExpanded) {
      return [
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
          value={this.props.radius.toFixed(0)}
        />,
      ];
    }
    return false;
  }


  render() {
    const className = classnames(styles.listItemInn, {
      [styles2.listItemInn_expanded]: this.props.isExpanded,
    });

    return (
      <div
        className={className}
      >
        <h1 key="name">
          {this.props.name}
        </h1>
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
