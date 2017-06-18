import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { hideLayer } from 'utils/mapBoxMap';
import { generateInnerHTMLForHistoryMoment } from 'screens/Chronicle/utils/strings';
import { getNormalized100T } from 'screens/Chronicle/reducer';

require('containers/Map/leafletStyles.css');


class ChronicleMarker extends React.Component {

  constructor(props) {
    super(props);
    this.createMarkers();
  }

  componentWillUnmount() {
  // TODO: need to delete MapBox markers?
    this.removeMarker();
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.popUp.setLatLng(latLng);
    this.theMarkerSecondary.setLatLng(latLng);
  }

  createMarkers() {
    const vehicleMArkerColor = '#3388ff'; // '#2c3e50'
    const markerR = 5;
    const startPos = window.L.latLng(0, 0);
    this.theMarkerSecondary = window.L.circleMarker(startPos,
      { opacity: 1,
        fillOpacity: 1,
        color: '#0A5',
        fillColor: '#008241',
      })
      .setRadius(markerR);
    this.theMarker = window.L.circleMarker(startPos,
      { opacity: 1,
        fillOpacity: 1,
        color: vehicleMArkerColor,
        fillColor: vehicleMArkerColor,
        // color: '#e64a19',
        // fillColor: '#e64a19',
      })
      .setRadius(markerR);
    this.popUp = window.L.popup({
      offset: [0, markerR],
      className: 'ddsMapHistoryPopup', // styles.ddsMapHistoryPopup,
      closeButton: false,
      closeOnClick: false,
      autoPan: false,
      keepInView: false,
      zoomAnimation: true,
    })
    .setContent('loading...');
    this.popUp.setLatLng(startPos);
  }

  update() {
    this.props.chronicleFrame.player.gotoTime100(this.props.normalized100T);
    const momentData = this.props.chronicleFrame.player.getCurrentMomentData();
    this.setPosition(momentData.pos);
    this.popUp.setContent(generateInnerHTMLForHistoryMoment(momentData));
  }

  removeMarker() {
    if (this.props.theMap === null) {
      return;
    }
    hideLayer(this.props.theMap, this.popUp, true);
    if (this.props.theMap.hasLayer(this.theMarker)) {
      this.props.theMap.removeLayer(this.theMarker);
    }
    if (this.props.theMap.hasLayer(this.theMarkerSecondary)) {
      this.props.theMap.removeLayer(this.theMarkerSecondary);
    }
  }

  highLight(doHighlight) {
    if (doHighlight) {
      hideLayer(this.props.theMap, this.theMarker, false);
      hideLayer(this.props.theMap, this.theMarkerSecondary, true);
      if (!this.props.theMap.hasLayer(this.popUp)) {
        this.props.theMap.addLayer(this.popUp);
        //
        // pan to me when selected
        const bounds = this.props.theMap.getBounds();
        if (!bounds.contains(this.popUp.getLatLng())) {
          this.props.theMap.panTo(this.popUp.getLatLng());
        }
      }
    } else {
      if (this.props.theMap.hasLayer(this.theMarker)) {
        this.props.theMap.removeLayer(this.theMarker);
      }
      if (this.props.theMap.hasLayer(this.popUp)) {
        this.props.theMap.removeLayer(this.popUp);
      }
      if (!this.props.theMap.hasLayer(this.theMarkerSecondary)) {
        this.props.theMap.addLayer(this.theMarkerSecondary);
      }
    }
  }


  render() {
    this.update();
    this.highLight(this.props.isSelected);
    return false;
  }
}

ChronicleMarker.propTypes = {
  theMap: React.PropTypes.object.isRequired,
  chronicleFrame: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  normalized100T: React.PropTypes.number.isRequired,

  // translations: phrasesShape.isRequired,
};

const mapState = state => ({
  normalized100T: getNormalized100T(state),
});

const PureChronicleMarker = pure(ChronicleMarker);
const Connected = connect(mapState)(PureChronicleMarker);

export default Connected;
