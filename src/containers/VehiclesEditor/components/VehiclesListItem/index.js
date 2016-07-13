import React from 'react';
import pure from 'recompose/pure';

import styles from './styles.css';

class VehicleDetails extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.index);
  }

  render() {
    return (
      <div
        className={styles.item}
        onClick={this.onClick}
      >
        <span className={styles.link}>
          {`${this.props.index} – ${this.props.name}`}
        </span>
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  index: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default pure(VehicleDetails);
