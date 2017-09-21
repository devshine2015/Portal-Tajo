import React from 'react';
import PowerList from 'components/PowerList';
// import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import PropTypes from 'prop-types';

const DealerPowerList = (props) => {
  return (
    <PowerList
      scrollable
      offsetTop={5}
      content={
        <VehiclesList
          onItemClick={props.onVehicleSelect}
          data={props.vehicles}
        />
      }
    />
  );
};

DealerPowerList.propTypes = {
  vehicles: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  onVehicleSelect: PropTypes.func.isRequired,
};

export default DealerPowerList;
