import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { hideLayer } from 'utils/mapBoxMap';
import { generateChronoPopupInnerHTML } from 'screens/DemoChronicle/utils/strings';
import { getNormalized100T } from 'screens/DemoChronicle/reducer';

require('containers/DemoMap/leafletStyles.css');


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
    const markerR = 5;
    const startPos = window.L.latLng(0, 0);
    this.markerIcon = window.L.divIcon({
      className: 'chronicleMarker',
      iconAnchor: [38, 90],
      html: `<div>
          <div class="chronicleMarker">
            <svg width="80" viewBox="0 0 124 151"><defs><linearGradient id="c" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#0076FF"/><stop offset="100%" stop-color="#00FF80"/></linearGradient><path id="b" d="M52 132c34.667-27.52 52-54.187 52-80 0-28.719-23.281-52-52-52S0 23.281 0 52c0 25.813 17.333 52.48 52 80z"/><filter id="a" width="133.7%" height="126.5%" x="-16.8%" y="-9.5%" filterUnits="objectBoundingBox"><feOffset dy="5" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="5"/><feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/></filter><linearGradient id="e" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#FF2A68"/><stop offset="100%" stop-color="#FF5E3A"/></linearGradient><circle id="d" cx="45" cy="45" r="45"/></defs><g fill="none" fill-rule="evenodd"><g transform="translate(10 5)"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="url(#c)" xlink:href="#b"/></g><g transform="translate(17 12)"><mask id="f" fill="#fff"><use xlink:href="#d"/></mask><use fill="url(#e)" xlink:href="#d"/><g fill="#FFF" mask="url(#f)"><g transform="translate(11 31)"><path d="M45.25 44.376c0 .62-.503 1.125-1.125 1.125h-2.25a1.125 1.125 0 1 1 0-2.25h2.25c.622 0 1.125.504 1.125 1.125zm22.5 0c0 .62-.503 1.125-1.125 1.125h-18a1.125 1.125 0 1 1 0-2.25h18c.622 0 1.125.504 1.125 1.125zm-31.5 0c0 .62-.503 1.125-1.125 1.125h-11.25a1.125 1.125 0 1 1 0-2.25h11.25c.622 0 1.125.504 1.125 1.125zm-18 0c0 .62-.503 1.125-1.125 1.125H1.375a1.125 1.125 0 1 1 0-2.25h15.75c.622 0 1.125.504 1.125 1.125zM30.625 34.25a1.126 1.126 0 0 1 0-2.25 1.126 1.126 0 0 1 0 2.25zm0-4.5a3.38 3.38 0 0 0-3.375 3.375 3.38 3.38 0 0 0 3.375 3.375A3.38 3.38 0 0 0 34 33.126a3.38 3.38 0 0 0-3.375-3.375zm-18 4.5a1.126 1.126 0 0 1 0-2.25 1.126 1.126 0 0 1 0 2.25zm0-4.5a3.38 3.38 0 0 0-3.375 3.375 3.38 3.38 0 0 0 3.375 3.375A3.38 3.38 0 0 0 16 33.126a3.38 3.38 0 0 0-3.375-3.375zm42.75 4.5a1.126 1.126 0 0 1 0-2.25 1.126 1.126 0 0 1 0 2.25zm0-4.5A3.38 3.38 0 0 0 52 33.126a3.38 3.38 0 0 0 3.375 3.375 3.38 3.38 0 0 0 3.375-3.375 3.38 3.38 0 0 0-3.375-3.375zm0 9a5.631 5.631 0 0 1-5.625-5.625 5.631 5.631 0 0 1 5.625-5.625A5.631 5.631 0 0 1 61 33.126a5.631 5.631 0 0 1-5.625 5.625zm-10.125-36h7.875c1.958 0 3.65 1.967 4.593 3.826L60.502 14H56.07l1.437-2.872a1.126 1.126 0 0 0-2.014-1.006L53.555 14H45.25V2.75zm-14.625 36A5.631 5.631 0 0 1 25 33.126a5.631 5.631 0 0 1 5.625-5.625 5.631 5.631 0 0 1 5.625 5.625 5.631 5.631 0 0 1-5.625 5.625zm35.67-21.046l-3.203-3.202-3.288-8.772a1.564 1.564 0 0 0-.047-.108C58.153 2.416 55.674.5 53.125.5h-9C43.503.5 43 1.005 43 1.626V32h-4.59c-.548-3.81-3.825-6.75-7.785-6.75-4.341 0-7.875 3.532-7.875 7.875 0 4.342 3.534 7.875 7.875 7.875 3.96 0 7.237-2.94 7.785-6.75h5.715c.622 0 1.125-.504 1.125-1.125V16.25h16.41l3.045 3.045c.64.641.793 2.116.795 2.58V23h-1.125a1.125 1.125 0 1 0 0 2.25H65.5V32h-2.34c-.548-3.81-3.825-6.75-7.785-6.75-4.341 0-7.875 3.532-7.875 7.875 0 4.342 3.534 7.875 7.875 7.875 3.96 0 7.237-2.94 7.785-6.75h3.465c.622 0 1.125-.504 1.125-1.125v-11.25c0-.278-.04-2.758-1.455-4.17zM12.625 38.75A5.631 5.631 0 0 1 7 33.126a5.631 5.631 0 0 1 5.625-5.625 5.631 5.631 0 0 1 5.625 5.625 5.631 5.631 0 0 1-5.625 5.625zm0-13.5c-4.341 0-7.875 3.532-7.875 7.875S8.284 41 12.625 41s7.875-3.533 7.875-7.875c0-4.343-3.534-7.875-7.875-7.875z"/><rect width="2.25" height="29.25" x=".25" y="2.75" rx="1.125"/><rect width="2.25" height="41.625" x="20.5" y="-17.5" rx="1.125" transform="rotate(90 21.625 3.313)"/></g></g></g></g></svg>
          </div>
        </div>`,
    });
    this.theMarker = window.L.marker(startPos, { icon: this.markerIcon });
    this.theMarkerSecondary = window.L.circleMarker(startPos,
      { opacity: 0.2,
        fillOpacity: 0.2,
        color: '#0A5',
        fillColor: '#008241',
      })
      .setRadius(5);

    this.popUp = window.L.popup({
      offset: [0, -70],
      className: 'chronicleMarkerInfo',
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
    this.popUp.setContent(generateChronoPopupInnerHTML(momentData));
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
  theMap: PropTypes.object.isRequired,
  chronicleFrame: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  normalized100T: PropTypes.number.isRequired,

  // translations: phrasesShape.isRequired,
};

const mapState = state => ({
  normalized100T: getNormalized100T(state),
});

const PureChronicleMarker = pure(ChronicleMarker);
const Connected = connect(mapState)(PureChronicleMarker);

export default Connected;
