import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import VehiclesList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import Layout from 'components/Layout';
import { showSnackbar } from 'containers/Snackbar/actions';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import { vehiclesActions } from 'services/FleetModel/actions';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getVehicleFilterString } from 'services/Global/reducer';

import VehicleDetailsTmpl from './components/VehicleDetailsTemplated';
import VehicleDetails from './components/VehicleDetails';
import { getLoaderState } from './reducer';
import { detailsActions } from './actions';
import { translate } from 'utils/i18n';
import { isDealer } from 'configs';

import phrases, { phrasesShape } from './PropTypes';

class VehiclesEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.getSelectedState({
        id: props.globalSelectedVehicleId,
        vehicles: props.vehicles,
      }),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.vehicles.length && nextProps.vehicles.length) {
      this.setState({
        ...this.getSelectedState({
          id: nextProps.globalSelectedVehicleId,
          vehicles: nextProps.vehicles,
        }),
      });
    }
  }
  /**
   * Combine new data with the old ones
   * since server requiring all details to be sent
   * needResort if name has been changed
   * device {needDetach, needAttach}
   * */
  onDetailsSave = (data, needResort, device) => {
    const { selectedVehicleId } = this.state;

    this.props.updateDetails({
      data,
      selectedVehicleId,
      needResort,
      device,
    })
      .then(() => {
      }, () => {
        this.props.showSnackbar(this.props.translations.send_fail, 5000);
      });
  }

  onDetailsCancel = () => {
    // this.closeEditor();
  }

  onChooseVehicle = (id) => {
    this.setState({
      ...this.getSelectedState({
        id,
        vehicles: this.props.vehicles,
      }),
    });
  }

  onVehicleDisable = () => {
    const vehicle = this.props.vehicles[this.state.selectedVehicleOriginalIndex];

    // do optimistic update
    this.setState({
      selectedVehicleOriginalIndex: 0,
      selectedVehicleId: this.props.vehicles[0].id,
    }, () => {
      this.props.disableVehicle(vehicle);
    });
  }

  getSelectedState = ({
    id,
    vehicles,
  }) => {
    const result = {
      selectedVehicleOriginalIndex: undefined,
      selectedVehicleId: undefined,
    };

    if (id) {
      const v = getVehicleById(id, vehicles);

      result.selectedVehicleId = id;
      result.selectedVehicleOriginalIndex = v.vehicleIndex;
    } else if (vehicles.length > 0) {
      result.selectedVehicleId = vehicles[0].id;
      result.selectedVehicleOriginalIndex = 0;
    }

    return result;
  }

  /**
   * Close editor
   * */
  closeEditor = () => {
    this.setState({
      selectedVehicleOriginalIndex: undefined,
    });
  }

  renderDetails() {
    const { selectedVehicleOriginalIndex } = this.state;

    if (selectedVehicleOriginalIndex === undefined) {
      return null;
    }

    /**
     * Provide data required by component
     * */
    const vehicle = this.props.vehicles[selectedVehicleOriginalIndex];
    const data = {
      ...vehicle.original,
      marker: vehicle.marker,
      driverId: vehicle.driverId,
      // dist.total units is meter.
      // Here we convert it back to kilometers just for UI.
      // Ie. users don't need high precision here.'
      odometer: (vehicle.dist.total / 1000).toFixed(0),
      lastServiceOdo: vehicle.lastServiceOdo,
    };

    return (
      <Layout.FixedContent >
        {isDealer ?
          <VehicleDetailsTmpl
            isLoading={this.props.isLoading}
            details={data}
            onSave={this.onDetailsSave}
            onCancel={this.onDetailsCancel}
            onDisable={this.onVehicleDisable}
            disabled={this.props.isLoading}
          />
          :
          <VehicleDetails
            isLoading={this.props.isLoading}
            details={data}
            onSave={this.onDetailsSave}
            onCancel={this.onDetailsCancel}
            onDisable={this.onVehicleDisable}
            disabled={this.props.isLoading}
          />
        }
      </Layout.FixedContent>
    );
  }

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }

    return (
      <Layout.ScreenWithList>
        <PowerList
          scrollable
          filter={
            <Filter
              filterFunc={this.props.filterFunc}
              defaultValue={this.props.vehicleFilterString}
            />
          }
          content={
            <VehiclesList
              onItemClick={this.onChooseVehicle}
              data={this.props.vehicles}
              currentExpandedItemId={this.state.selectedVehicleId}
            />
          }
        />

        {this.renderDetails()}
      </Layout.ScreenWithList>
    );
  }
}

VehiclesEditor.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  vehicles: PropTypes.array.isRequired,
  updateDetails: PropTypes.func.isRequired,
  filterFunc: PropTypes.func.isRequired,
  globalSelectedVehicleId: PropTypes.string.isRequired,
  vehicleFilterString: PropTypes.string,
  disableVehicle: PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  isLoading: getLoaderState(state),
  globalSelectedVehicleId: fromFleetReducer.getSelectedVehicleId(state),
  vehicleFilterString: getVehicleFilterString(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  disableVehicle: detailsActions.disableVehicleAndDevice,
  updateDetails: detailsActions.updateDetails,
  showSnackbar,
};

const PureVehiclesEditor = pure(VehiclesEditor);
const Connected = connect(mapState, mapDispatch)(PureVehiclesEditor);

export default translate(phrases)(Connected);
