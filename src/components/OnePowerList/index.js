import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Filter from 'components/DemoFilter';
import ItemsList from 'components/OneInstancesList';
import listTypes from 'components/OneInstancesList/types';
import { vehiclesActions } from 'services/FleetModel/actions';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';
import { getVehicleFilterString } from 'services/Global/reducer';
import { translate } from 'utils/i18n';

import { getMWAJobs, getMWASelectedJobId } from 'services/MWA/reducer';
import { mwaFilterJobs } from 'services/MWA/actions';

import phrases from './PropTypes';
import styles from './styles.css';

class OnePowerList extends React.Component {
  renderList = () => {
    const list = (
      <div>
        <h3 className={styles.title}>Vehicles</h3>
        <h5 className={styles.subtitle}>ALL</h5>
        <ItemsList
          currentExpandedItemId={this.props.selectedVehicleId}
          data={this.props.vehicles}
          type={listTypes.withVehicleDetails}
        />
      </div>
    );
    return list;
  }

  render() {
    return (
      <div>
        <Filter
          filterFunc={this.props.filterVehiclesFunc}
          defaultValue={this.props.vehicleFilterString}
        />
        { this.renderList()}
      </div>
    );
  }
}

OnePowerList.propTypes = {
  vehicles: PropTypes.array.isRequired,
  selectedVehicleId: PropTypes.string.isRequired,
  filterVehiclesFunc: PropTypes.func.isRequired,
  vehicleFilterString: PropTypes.string,
};

const mapState = state => ({
  selectedVehicleId: ctxGetSelectedVehicleId(state),
  vehicleFilterString: getVehicleFilterString(state),
  // mwaJobs: getMWAJobs(state),
  // getMWASelectedJobId: getMWASelectedJobId(state),
});
const mapDispatch = {
  filterVehiclesFunc: vehiclesActions.filterVehicles,
  mwaFilterJobs,
};

const PureOnePowerList = pure(OnePowerList);
const Connected = connect(mapState, mapDispatch)(PureOnePowerList);

export default translate(phrases)(Connected);
