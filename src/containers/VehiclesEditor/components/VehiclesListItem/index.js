import React from 'react';
import pure from 'recompose/pure';

import styles from './styles.css';

class VehicleDetails extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <div
        className={styles.item}
        onClick={this.onClick}
      >
        <span className={styles.link}>
          {this.props.name}
        </span>
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default pure(VehicleDetails);
