import React from 'react';
import pure from 'recompose/pure';

class VehicleDetails extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.index);
  }

  render() {
    return (
      <div onClick={this.onClick}>
        {`${this.props.index} – ${this.props.name}`}
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
