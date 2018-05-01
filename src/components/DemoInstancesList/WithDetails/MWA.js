import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { VelocityTransitionGroup } from 'velocity-react';
import ItemProperty from '../DetailItemProperty';
import Divider from 'material-ui/Divider';

import { mwaSelectJob } from 'services/MWA/actions';
import { contextActions } from 'services/Global/actions';
import { mapStoreSetPan } from 'containers/Map/reducerAction';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import stylesBase from '../styles.css';
import styles from './styles.css';
import { gfDetailsShape } from '../PropTypes';


class MWAJobWithDetails extends React.Component {

  onClick = () => {
    this.props.mwaSelectJob(this.props.mwaJobObject.id);
    this.props.selectVehicle(this.props.mwaJobObject.vehicleId);
    const veh = getVehicleById(this.props.mwaJobObject.vehicleId, this.props.vehicles).vehicle;
    this.props.mapStoreSetPan([veh.pos, this.latLngFromJob()]);
  }

  latLngFromJob = () => (
      window.L.latLng(parseFloat(this.props.mwaJobObject.X), parseFloat(this.props.mwaJobObject.Y))
  );

  renderDetails() {
    // if (this.props.isExpanded) {
    const jobStatus = this.props.mwaJobObject.JOB_STATUS_DESC != null ?
        this.props.mwaJobObject.JOB_STATUS_DESC
        : this.props.translations.n_a;
    const pipeSize = this.props.mwaJobObject.PIPE_SIZE_DESC != null ?
        this.props.mwaJobObject.PIPE_SIZE_DESC
        : this.props.translations.n_a;
    const pipeType = this.props.mwaJobObject.PIPE_TYPE_DESC != null ?
        this.props.mwaJobObject.PIPE_TYPE_DESC
        : this.props.translations.n_a;
    return (<div>
      <Divider key="line01" style={{ margin: '-1px 30px 10px 0px' }} />
      <ItemProperty
        key="carName"
        title={this.props.translations.mwa_job_carname}
        value={this.props.mwaJobObject.vehicleName}
      />
      <ItemProperty
        key="job"
        title={this.props.translations.job_status}
        value={jobStatus}
      />
      <ItemProperty
        key="pipeSz"
        title={this.props.translations.job_pipe}
        value={pipeSize}
      />
      <ItemProperty
        key="pipeT"
        title={this.props.translations.job_pipe_type}
        value={pipeType}
      />
    </div>);
    // }
    // return false;
  }

  render() {
    const className = classnames(stylesBase.listItemInn, {
      [styles.listItemInn_expanded]: this.props.isExpanded,
    });

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        <h1 key="name">
          {this.props.mwaJobObject.name}
        </h1>
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 500 }}
          leave={{ animation: 'slideUp', duration: 350 }}
        >
          { this.renderDetails() }
        </VelocityTransitionGroup>
      </div>
    );
  }
}

MWAJobWithDetails.propTypes = {
  mwaJobObject: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool,
  mwaSelectJob: PropTypes.func.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  mapStoreSetPan: PropTypes.func.isRequired,
  vehicles: PropTypes.array.isRequired,

  translations: gfDetailsShape.isRequired,
};

MWAJobWithDetails.defaultProps = {
  isExpanded: false,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  // gfById: getGFByIdFunc(state),
});
const mapDispatch = {
  mwaSelectJob,
  selectVehicle: contextActions.ctxSelectVehicle,
  mapStoreSetPan,
};
const PureListMWAJob = pure(MWAJobWithDetails);
export default connect(mapState, mapDispatch)(PureListMWAJob);
