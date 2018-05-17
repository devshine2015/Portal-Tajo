import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Filter from 'components/DemoFilter';
import ItemsList from 'components/OneInstancesList';
import listTypes from 'components/OneInstancesList/types';
import { vehiclesActions, gfActions } from 'services/FleetModel/actions';
import { contextActions } from 'services/Global/actions';
import { ctxGetPowListTabType, ctxGetSelectedVehicleId,
  ctxGetSelectedGFId } from 'services/Global/reducers/contextReducer';
import { getVehicleFilterString } from 'services/Global/reducer';
import { translate } from 'utils/i18n';

import { getMWAJobs, getMWASelectedJobId } from 'services/MWA/reducer';
import { mwaFilterJobs } from 'services/MWA/actions';

import phrases from './PropTypes';
import styles from './styles.css';

class OperationalPowerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listType: this.props.selectedTab,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTab !== this.state.listType) {
      this.setState({
        listType: nextProps.selectedTab,
      });
    }
  }

  renderList = () => {
    const list = this.state.listType === listTypes.withVehicleDetails ? (
      <div>
        <h3 className={styles.title}>Vehicles</h3>
        <h5 className={styles.subtitle}>ALL</h5>
        <ItemsList
          currentExpandedItemId={this.props.selectedVehicleId}
          data={this.props.vehicles}
          type={listTypes.withVehicleDetails}
        />
      </div>
    ) : (
      <div>
        <h3 className={styles.title}>Companies</h3>
        <h5 className={styles.subtitle}>ALL</h5>
        <ItemsList
          currentExpandedItemId={this.props.selectedGfId}
          data={this.props.gfs}
          type={listTypes.withGFDetails}
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

OperationalPowerList.propTypes = {
  selectedTab: PropTypes.string,
  vehicles: PropTypes.array.isRequired,
  gfs: PropTypes.array.isRequired,

  selectedGfId: PropTypes.string.isRequired,
  selectedVehicleId: PropTypes.string.isRequired,

  filterVehiclesFunc: PropTypes.func.isRequired,
  filterGFsFunc: PropTypes.func.isRequired,

  setListTypeFunc: PropTypes.func.isRequired,
  vehicleFilterString: PropTypes.string,
  mwaJobs: PropTypes.array.isRequired,
  getMWASelectedJobId: PropTypes.string,
  mwaFilterJobs: PropTypes.func.isRequired,
};
OperationalPowerList.defaultProps = {};

const mapState = (state) => ({
  selectedTab: ctxGetPowListTabType(state),
  selectedGfId: ctxGetSelectedGFId(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),

  vehicleFilterString: getVehicleFilterString(state),
  mwaJobs: getMWAJobs(state),
  getMWASelectedJobId: getMWASelectedJobId(state),
});
const mapDispatch = {

  filterVehiclesFunc: vehiclesActions.filterVehicles,
  filterGFsFunc: gfActions.filterGFs,
  setListTypeFunc: contextActions.ctxPowListTabType,
  mwaFilterJobs,
};

const PureOperationalPowerList = pure(OperationalPowerList);
const Connected = connect(mapState, mapDispatch)(PureOperationalPowerList);

export default translate(phrases)(Connected);
