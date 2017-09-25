import React, { Component } from 'react';
import DealerPage from 'containers/DealerPage';
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
      <DealerPage>
        <PowerList onVehicleSelect={this.switchVehicle} />
        <FixedContent>
          Here gonna be awesome graphs LOL
        </FixedContent>
      </DealerPage>
    );
  }
}

export default Page;
