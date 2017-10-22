import React from 'react';
import PowerList from 'components/PowerList';
// import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import PropTypes from 'prop-types';


class DealerPowerList extends React.Component {
  constructor(props) {
    super(props);
    this.selectInitalVehicle(props.vehicles);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vehicles.length === 0 && nextProps.vehicles.length > 0) {
      this.selectInitalVehicle(nextProps.vehicles);
    }
  }

  selectInitalVehicle = (arr = []) => {
    const initialId = arr[0].id || null;
    this.state = {
      selectedId: initialId,
    };
    this.selectCallback(initialId);
  }

  selectVehicle = (id) => {
    this.setState({
      selectedId: id,
    }, () => this.selectCallback(id));
  }

  selectCallback = (id) => {
    if (typeof this.props.onVehicleSelect === 'function') {
      this.props.onVehicleSelect(id);
    }
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
            noDefaultActivityIndicator
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
