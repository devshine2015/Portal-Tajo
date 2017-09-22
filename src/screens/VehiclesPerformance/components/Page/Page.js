import React, { Component } from 'react';
import FixedContent from 'components/FixedContent';
// import PropTypes from 'prop-types';
import PowerList from '../PowerList';

class Page extends Component {
  state = {
    vehicleId: undefined,
  };

  switchVehicle = (id) => {
    this.setState({
      vehicleId: id,
    });
  }

  render() {
    return (
      <div>
        <PowerList onVehicleSelect={this.switchVehicle} />
        <FixedContent>
          Here gonna be awesome graphs LOL
        </FixedContent>
      </div>
    );
  }
}

export default Page;
