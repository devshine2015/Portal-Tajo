import React, { Component } from 'react';
import PowerList from 'components/PowerList';
// import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import PropTypes from 'prop-types';

class DealerPowerList extends Component {

  onChooseVehicle = (e) => {
    console.log(e);
  }

  render() {
    return (
      <PowerList
        scrollable
        offsetTop={5}
        content={
          <VehiclesList
            onItemClick={this.onChooseVehicle}
            data={this.props.vehicles}
          />
        }
      />
    );
  }
}

DealerPowerList.propTypes = {
  vehicles: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default DealerPowerList;
