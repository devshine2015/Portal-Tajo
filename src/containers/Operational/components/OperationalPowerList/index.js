import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import PowerList from 'components/PowerList';
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

import GFEditor from 'containers/GFEditor';
import { gfEditIsEditing } from 'containers/GFEditor/reducer';
import { isMaritime, isMwa } from 'configs';
import { getMWAJobs, getMWASelectedJobId } from 'services/MWA/reducer';
import { mwaSelectJob, mwaFilterJobs } from 'services/MWA/actions';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

import VehicleIcon from 'material-ui/svg-icons/maps/local-shipping';
import LocationIcon from 'material-ui/svg-icons/social/location-city';
import PoiIcon from 'material-ui/svg-icons/maps/place';


// TODO ---- CLEAN this up
import * as listEvents from './events';
import * as mapEvents from 'containers/MapFleet/events';




const iconColor = '#FFFFFF';
const iconHoverColor = '#FFEEAA';

class OperationalPowerList extends React.Component {

  onTabChange = (value) => {
    this.props.setListTypeFunc(value);
  }

  render() {
    if (this.props.isEditGF) {
      return (
        <PowerList>
          <GFEditor />
        </PowerList>
      );
    }

    const vehType = isMaritime ? listTypes.maritime : listTypes.withVehicleDetails;
    const { translations } = this.props;

    return (
      <PowerList>
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
                  onItemClick={(mwaJobObj) => {
                    this.props.mwaSelectJob(mwaJobObj.id);
                    /*this.props.setSelectedVehicleId(mwaJobObj.vehicleId); */
                  }}
                  type={listTypes.mwaJob}
                />
              </Scrollable>
            </Tab>
          }
        </Tabs>
      </PowerList>
    );
  }
}

OperationalPowerList.propTypes = {
  selectedTab: React.PropTypes.string,
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,

  selectedGfId: React.PropTypes.string.isRequired,
  selectedVehicleId: React.PropTypes.string.isRequired,

  filterVehiclesFunc: React.PropTypes.func.isRequired,
  filterGFsFunc: React.PropTypes.func.isRequired,

  isEditGF: React.PropTypes.bool.isRequired,
  setListTypeFunc: React.PropTypes.func.isRequired,
  vehicleFilterString: React.PropTypes.string,
  translations: phrasesShape.isRequired,
  mwaJobs: React.PropTypes.array.isRequired,
  mwaSelectJob: React.PropTypes.func.isRequired,
  getMWASelectedJobId: React.PropTypes.string.isRequired,
  mwaFilterJobs: React.PropTypes.func.isRequired,
};
OperationalPowerList.defaultProps = {
  translations: phrases,
};

const mapState = (state) => ({
  selectedTab: ctxGetPowListTabType(state),
  selectedGfId: ctxGetSelectedGFId(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),

  isEditGF: gfEditIsEditing(state),
  vehicleFilterString: getVehicleFilterString(state),
  mwaJobs: getMWAJobs(state),
  getMWASelectedJobId: getMWASelectedJobId(state),
});
const mapDispatch = {

  filterVehiclesFunc: vehiclesActions.filterVehicles,
  filterGFsFunc: gfActions.filterGFs,
  setListTypeFunc: contextActions.ctxPowListTabType,
  mwaSelectJob,
  mwaFilterJobs,
};

const PureOperationalPowerList = pure(OperationalPowerList);
const Connected = connect(mapState, mapDispatch)(PureOperationalPowerList);

export default translate(phrases)(Connected);
