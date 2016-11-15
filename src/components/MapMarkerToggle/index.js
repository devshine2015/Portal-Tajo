import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import DeletIcon from 'material-ui/svg-icons/action/delete-forever';
// import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import CarIcon from 'material-ui/svg-icons/maps/local-shipping';
// import LocationIcon from 'material-ui/svg-icons/social/location-city';
import LocationIcon from 'material-ui/svg-icons/social/location-city';
import { red900, red500, teal100, teal200, yellow700, yellow500 } from 'material-ui/styles/colors';

import { ctxGetHideGF, ctxGetHideVehicles, ctxGetPowListTabType } from 'services/Global/reducers/contextReducer';
import { contextActions } from 'services/Global/actions';

import listTypes from 'components/InstancesList/types';

import styles from './styles.css';

class MapMarkerToggle extends React.Component {

  onClick = () => {
    switch (this.props.listType) {
      case listTypes.withGFDetails:
        this.props.doHideVehicles(!this.props.isHideVehicles);
        break;
      // TODO: for now, hide GFs if unknown list type (for chronicle view)
      case listTypes.withVehicleDetails:
      default:
        this.props.doHideGF(!this.props.isHideGF);
        break;
    }
  }

  hidePrefix = (isHide) =>
    isHide ? 'Show ' : 'Hide '

  contentText = () => {
    switch (this.props.listType) {
      case listTypes.withGFDetails:
        return this.hidePrefix(this.props.isHideVehicles) + 'Vehicles';
      case listTypes.withVehicleDetails:
      default:
        return this.hidePrefix(this.props.isHideGF) + 'Locations';
    }
  }
  contentIcon = () => {
    switch (this.props.listType) {
      case listTypes.withGFDetails:
        return (<CarIcon color={yellow700} hoverColor={yellow500} />);
      case listTypes.withVehicleDetails:
      default:
        return (<LocationIcon color={yellow700} hoverColor={yellow500} />);
    }
  }

  render() {
    return (
      <IconButton
        tooltip="Toggle"
        onClick={this.onClick}
        className={styles.iconBtn}
        key="delBtn"
      >
        {this.contentIcon()}
      </IconButton>
    );
  }
  // render() {
  //   return (
  //     <button
  //       className={styles.toggle}
  //       onClick={this.onClick}
  //     >
  //     {this.contentText()}
  //     </button>
  //   );
  // }
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
