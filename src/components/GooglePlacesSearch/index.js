import React from 'react';
import ReactDOM from 'react-dom';

import pure from 'recompose/pure';
import { hideLayer } from 'utils/mapBoxMap';
const googleMapsAPI = require('google-maps-api')('AIzaSyA-97-nJq7i1hy46cjHJSeOwkKgBdv08aI',
      ['places']);
const iconPointer = require('assets/images/v_icons_combi/pointerArrow.png');

import styles from './styles.css';

class GooglePlacesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.searchPin = null;
    this.state = {
      previousValueLength: null,
    };
  }

  componentDidMount() {
    // maybe be using it without map as well
    this.setUpOnMap();
  }

  onChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    const isClearing = value.length < this.state.previousValueLength;
    this.setState({
      previousValueLength: value.length,
    });
    if (isClearing) {
      this.hideMarker(true);
    }
  }

  setUpOnMap() {
    googleMapsAPI().then(maps => {
      const element = ReactDOM.findDOMNode(this);
      this.searchBox = new maps.places.SearchBox(element);

      maps.event.addListener(this.searchBox, 'places_changed', () => {
        const places = this.searchBox.getPlaces();
        if (places.length < 1) {
          return;
        }
  // use the first one
        const place = places[0];
        const posOfInterest = window.L.latLng(place.geometry.location.lat(),
            place.geometry.location.lng());
        const bounds = this.props.ownerMapObj.getBounds();
        if (!bounds.contains(posOfInterest)) {
          this.props.ownerMapObj.panTo(posOfInterest);
        }
      // if(_this.resultListener!==null)
      //   _this.resultListener( mapBoxPos );
        if (this.searchPin === null) {
          // this.searchPin = window.L.circleMarker(posOfInterest,
          //   {
          //     className: styles.animatedS,
          //   });
          // this.searchPin.setRadius(12);
          const iScale = 0.15;
          const iW = 152 * iScale;
          const iH = 253 * iScale;
          this.selectedMarkerIcon = window.L.icon({
            iconUrl: iconPointer,
            iconSize: [iW, iH],
            iconAnchor: [0, iH],
            className: styles.animatedS,
          });
          this.searchPin = window.L.marker(posOfInterest,
            {
              className: styles.animatedS,
            });
          this.searchPin = window.L.marker(posOfInterest,
            {
              // title: this.props.theGF.name,
              icon: this.selectedMarkerIcon,
              riseOnHover: true,
            });
          this.searchPin.setZIndexOffset(2000);
        } else {
          this.searchPin.setLatLng(posOfInterest);
        }
        this.hideMarker(false);
      //   _this.updateLines();
      });
    });
  }

  hideMarker(doHide) {
    hideLayer(this.props.ownerMapObj, this.searchPin, doHide);
  }
  render() {
    return (
      <input className={styles.searchContainer} type="text"
        placeholder="Search Box" onChange={this.onChange}
      />
    );
  }
}

GooglePlacesSearch.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
GooglePlacesSearch.propTypes = {
  ownerMapObj: React.PropTypes.object,
};

export default pure(GooglePlacesSearch);
