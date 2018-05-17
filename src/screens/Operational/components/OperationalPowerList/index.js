import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import Filter from 'components/Filter';
import ItemsList from 'components/InstancesList';
import Scrollable from 'components/Scrollable';
import listTypes from 'components/InstancesList/types';
import { vehiclesActions, gfActions } from 'services/FleetModel/actions';
import { contextActions } from 'services/Global/actions';
import { ctxGetPowListTabType, ctxGetSelectedVehicleId,
      ctxGetSelectedGFId } from 'services/Global/reducers/contextReducer';
import { getVehicleFilterString } from 'services/Global/reducer';
import { translate } from 'utils/i18n';

import { isMaritime, isMwa } from 'configs';
import { getMWAJobs, getMWASelectedJobId } from 'services/MWA/reducer';
import { mwaFilterJobs } from 'services/MWA/actions';

import styles from './styles.css';
import phrases from './PropTypes';

import VehicleIcon from 'material-ui/svg-icons/maps/local-shipping';
import LocationIcon from 'material-ui/svg-icons/social/location-city';
import PoiIcon from 'material-ui/svg-icons/maps/place';

const iconColor = '#FFFFFF';
const iconHoverColor = '#FFEEAA';

class OperationalPowerList extends React.Component {

  onTabChange = (value) => {
    this.props.setListTypeFunc(value);
  }

  render() {
    const vehType = isMaritime ? listTypes.maritime : listTypes.withVehicleDetails;

    return (
      <Tabs
        inkBarStyle={{
          backgroundColor: 'rgba(255,255,255,0.75)',
        }}
        className={styles.fullHeight}
        contentContainerClassName={styles.contentFullHeight}
        onChange={this.onTabChange}
        value={this.props.selectedTab || listTypes.withVehicleDetails}
      >
        <Tab
          icon={<VehicleIcon color={iconColor} hoverColor={iconHoverColor} />}
          value={listTypes.withVehicleDetails}
        >
          <Filter
            filterFunc={this.props.filterVehiclesFunc}
            defaultValue={this.props.vehicleFilterString}
          />
          <Scrollable>
            <ItemsList
              scrollIntoView
              currentExpandedItemId={this.props.selectedVehicleId}
              data={this.props.vehicles}
              type={vehType}
            />
          </Scrollable>
        </Tab>
        <Tab
          icon={<LocationIcon color={iconColor} hoverColor={iconHoverColor} />}
          value={listTypes.withGFDetails}
        >
          <Filter filterFunc={this.props.filterGFsFunc} />

          <Scrollable>
            <ItemsList
              scrollIntoView
              currentExpandedItemId={this.props.selectedGfId}
              data={this.props.gfs}
              type={listTypes.withGFDetails}
            />
          </Scrollable>
        </Tab>
        {isMwa &&
        <Tab
          icon={<PoiIcon color={iconColor} hoverColor={iconHoverColor} />}
          value={listTypes.mwaJob}
        >
          <Filter filterFunc={this.props.mwaFilterJobs} />

          <Scrollable>
            <ItemsList
              scrollIntoView
              data={this.props.mwaJobs}
              currentExpandedItemId={this.props.getMWASelectedJobId}
              type={listTypes.mwaJob}
            />
          </Scrollable>
        </Tab>
        }
      </Tabs>
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
