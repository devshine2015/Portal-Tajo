import React from 'react';
import PowerList from 'components/PowerList';
// import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import PropTypes from 'prop-types';

const selectInitalVehicle = (arr = []) => {
  return arr[0].id || null;
};

class DealerPowerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: selectInitalVehicle(props.vehicles),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vehicles.length === 0 && nextProps.vehicles.length > 0) {
      this.state = {
        selectedId: selectInitalVehicle(nextProps.vehicles),
      };
    }
  }

  selectVehicle = (id) => {
    this.setState({
      selectedId: id,
    }, () => {
      if (typeof this.props.onVehicleSelect === 'function') {
        this.props.onVehicleSelect(id);
      }
    });
  }

  render() {
    return (
      <PowerList
        scrollable
        offsetTop={5}
        content={
          <VehiclesList
            currentExpandedItemId={this.state.selectedId}
            onItemClick={this.selectVehicle}
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
  onVehicleSelect: PropTypes.func.isRequired,
};

export default DealerPowerList;
