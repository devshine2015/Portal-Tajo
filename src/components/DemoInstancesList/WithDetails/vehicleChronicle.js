import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { vehicleShape } from 'services/FleetModel/PropTypes';

import { contextActions } from 'services/Global/actions';
import { requestHistory } from 'screens/DemoChronicle/actions';

import {
  getChronicleTimeFrame,
  getInstanceChronicleFrameById,
} from 'screens/Chronicle/reducer';

import stylesTop from '../styles.css';
import styles from './styles.css';
import { historyDetailsShape } from '../PropTypes';

class ChronicleListItem extends React.Component {
  onClick = () => {
    this.props.selectVehicle(this.props.id);
  }

  render() {
    return (
      <div
        className={stylesTop.listItemInn}
        onClick={this.onClick}
      >
        <div className={styles.imageWrapper}>
          <img
            src={require('assets/images/demo/combined-shape.png')}
            alt="vehicle"
          />
        </div>
        <div className={styles.nameWrapper}>
          <h2>
            { this.props.vehicle.original.name }
          </h2>
          <span className={styles.trips}>{this.props.vehicle.original.trips} trips</span>
        </div>
        <div className={classnames(styles.selectedCircle, {[styles.selectedCircleActive]: this.props.isExpanded})}></div>
      </div>
    );
  }
}

ChronicleListItem.propTypes = {
  id: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  vehicle: vehicleShape.isRequired,

  chronicleTimeFrame: PropTypes.object.isRequired,
  getInstanceChronicleFrameById: PropTypes.func.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  requestHistory: PropTypes.func.isRequired,

  translations: historyDetailsShape.isRequired,
};

ChronicleListItem.defaultProps = {
  isExpanded: false,
};

const mapState = (state) => ({
  getInstanceChronicleFrameById: getInstanceChronicleFrameById(state),
  chronicleTimeFrame: getChronicleTimeFrame(state),
});
const mapDispatch = {
  selectVehicle: contextActions.ctxSelectVehicle,
  requestHistory,
};

export default connect(mapState, mapDispatch)(pure(ChronicleListItem));
