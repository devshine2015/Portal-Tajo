import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { ctxGetHideGF, ctxGetHideVehicles, ctxGetPowListTabType } from 'services/Global/reducers/contextReducer';
import { contextActions } from 'services/Global/actions';

import listTypes from 'components/InstancesList/types';

import styles from './styles.css';

class MapMarkerToggle extends React.Component {

  onClick = () => {
    switch (this.props.listType) {
      case listTypes.withVehicleDetails:
        this.props.doHideGF(!this.props.isHideGF);
        break;
      case listTypes.withGFDetails:
        this.props.doHideVehicles(!this.props.isHideVehicles);
        break;
      default:
    }
  }

  hidePrefix = (isHide) =>
    isHide ? 'Show ' : 'Hide '

  contentText = () => {
    switch (this.props.listType) {
      case listTypes.withVehicleDetails:
        return this.hidePrefix(this.props.isHideGF) + 'Locations';
      case listTypes.withGFDetails:
        return this.hidePrefix(this.props.isHideVehicles) + 'Vehicles';
      default:
    }
    return '';
  }

  render() {
    return (
      <button
        className={styles.toggle}
        onClick={this.onClick}
      >
      {this.contentText()}
      </button>
    );
  }
}

MapMarkerToggle.propTypes = {
  listType: React.PropTypes.string.isRequired,
  doHideGF: React.PropTypes.func.isRequired,
  doHideVehicles: React.PropTypes.func.isRequired,
  isHideGF: React.PropTypes.bool.isRequired,
  isHideVehicles: React.PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  listType: ctxGetPowListTabType(state),
  isHideGF: ctxGetHideGF(state),
  isHideVehicles: ctxGetHideVehicles(state),
});
const mapDispatch = {
  doHideGF: contextActions.ctxHideGF,
  doHideVehicles: contextActions.ctxHideVehicles,
};
const PureMapMarkerToggle = pure(MapMarkerToggle);
export default connect(mapState, mapDispatch)(PureMapMarkerToggle);
