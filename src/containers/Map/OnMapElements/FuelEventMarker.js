import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';
import tinycolor from 'tinycolor2';
import { hideLayer } from 'utils/mapBoxMap';
import { theme } from 'configs';
import moment from 'moment';

require('containers/Map/leafletStyles.css');

const highlighetR = 8;
const normalR = 2;

function getColor(alertEvent) {
  return alertEvent.alertType === 'REFUEL' ? theme.palette.okColor : theme.palette.alertColor;
}

class FuelMarker extends React.Component {
  constructor(props) {
    super(props);
    this.createMarkers();
  }

  componentWillUnmount() {
  // TODO: need to delete MapBox markers?
    this.removeMarker();
  }

  createMarkers() {
    const pos = window.L.latLng(this.props.latLng);
    this.theMarker = window.L.circleMarker(pos,
      { opacity: 1,
        fillOpacity: 0.7,
        color: tinycolor(getColor(this.props.fuelEvent)).darken(10).toString(),
        fillColor: getColor(this.props.fuelEvent),
      })
      .setRadius(highlighetR);
    this.popUp = window.L.popup({
      offset: [0, highlighetR],
      className: 'ddsMapHistoryPopup', // styles.ddsMapHistoryPopup,
      closeButton: false,
      closeOnClick: true,
      autoPan: false,
      keepInView: false,
      zoomAnimation: true,
      // here to format date without tz
    }).setContent(`${moment(this.props.fuelEvent.date).utc().format('DD/MM/YY HH:mm')
    }<br>${
      this.props.fuelEvent.alertType === 'REFUEL' ? 'Refuel : ' : 'Loss : '}   ${this.props.fuelEvent.liters.toFixed(1)} Ltr`);
    this.popUp.setLatLng(pos);

    // this.theMarker.on('click', () => {
    //   // this.props.onClick();
    //   // this.clickHandle(this.props.theVehicle.id);
    // });
  }

  removeMarker() {
    if (this.props.theMap !== null) {
      hideLayer(this.props.theMap, this.theMarker, true);
      hideLayer(this.props.theMap, this.popUp, true);
    }
  }

  highLight(doHighlight) {
    hideLayer(this.props.theMap, this.theMarker, false);
    this.theMarker.setRadius(doHighlight ? highlighetR : normalR);
    if (doHighlight) {
      this.theMarker.bindPopup(this.popUp);
    } else {
      this.theMarker.unbindPopup(this.popUp);
    }
  }


  render() {
    this.highLight(this.props.isHighLighted);
    return false;
  }
}

FuelMarker.propTypes = {
  theMap: PropTypes.object.isRequired,
  fuelEvent: PropTypes.object.isRequired,
  latLng: PropTypes.array.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isHighLighted: PropTypes.bool.isRequired,
};


export default pure(FuelMarker);
