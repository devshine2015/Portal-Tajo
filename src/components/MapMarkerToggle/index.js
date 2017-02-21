// TODO: make this element as proper MapBox controller
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
// import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import CarIcon from 'material-ui/svg-icons/maps/local-shipping';
// import LocationIcon from 'material-ui/svg-icons/social/location-city';
import LocationIcon from 'material-ui/svg-icons/social/location-city';

import { ctxGetHideGF, ctxGetHideVehicles,
    ctxGetPowListTabType } from 'services/Global/reducers/contextReducer';
import { contextActions } from 'services/Global/actions';
import listTypes from 'components/InstancesList/types';
import translator from 'utils/translator';

import styles from './styles.css';
import phrases, { phrasesShape } from './phrases.lang';

const iconColor = '#535353';
const iconHoverColor = '#00695C';

class MapMarkerToggle extends React.Component {

  onClick = () => {
    switch (this.props.overrideListType || this.props.listType) {
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
    isHide ? this.props.translations.show_text : this.props.translations.hide_text

  contentText = (forType) => {
    const { translations } = this.props;

    switch (forType) {
      case listTypes.withGFDetails:
        return `${this.hidePrefix(this.props.isHideVehicles)} ${translations.vehicles_text}`;
      case listTypes.withVehicleDetails:
      default:
        return `${this.hidePrefix(this.props.isHideGF)} ${translations.locations_text}`;
    }
  }
  btnHideColor = (isHide) =>
    isHide ? '#ffffff' : '#f9f9f9';
  btnColor = (forType) => {
    switch (forType) {
      case listTypes.withGFDetails:
        return this.btnHideColor(this.props.isHideVehicles);
      case listTypes.withVehicleDetails:
      default:
        return this.btnHideColor(this.props.isHideGF);
    }
  }
  contentIcon = (forType) => {
    switch (forType) {
      case listTypes.withGFDetails:
        return (<CarIcon color={iconColor} hoverColor={iconHoverColor} />);
      case listTypes.withVehicleDetails:
      default:
        return (<LocationIcon color={iconColor} hoverColor={iconHoverColor} />);
    }
  }

  render() {
    const typeToUse = this.props.overrideListType || this.props.listType;
    const iconBtnSyle = { backgroundColor: this.btnColor(typeToUse),
            width: '36px', height: '36px', padding: '0' };
    const toolTip = this.contentText(typeToUse);
    return (
      <IconButton
        tooltip={toolTip}
        onClick={this.onClick}
        className={styles.iconBtn}
        style={ iconBtnSyle }
        key="toggleBtn"
      >
        {this.contentIcon(typeToUse)}
      </IconButton>
    );
  }
}

MapMarkerToggle.propTypes = {
  listType: React.PropTypes.string.isRequired,
  overrideListType: React.PropTypes.string,
  doHideGF: React.PropTypes.func.isRequired,
  doHideVehicles: React.PropTypes.func.isRequired,
  isHideGF: React.PropTypes.bool.isRequired,
  isHideVehicles: React.PropTypes.bool.isRequired,

  translations: phrasesShape.isRequired,
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
const Connected = connect(mapState, mapDispatch)(PureMapMarkerToggle);

export default translator(phrases)(Connected);
