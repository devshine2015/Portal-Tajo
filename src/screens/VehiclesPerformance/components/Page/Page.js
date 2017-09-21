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
      <div
        style={{
          height: 800,
        }}
      >
        <PowerList onVehicleSelect={this.switchVehicle} />
        <FixedContent>
          { this.state.vehicleId !== undefined &&
            <iframe
              src={`http://office.datavis.sg:30001/v1/driver/${this.state.vehicleId}`}
              style={{
                height: 800,
              }}
            />
          }
        </FixedContent>
      </div>
    );
  }
}

export default Page;
