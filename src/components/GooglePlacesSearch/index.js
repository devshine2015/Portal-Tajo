import React from 'react';
import ReactDOM from 'react-dom';

import pure from 'recompose/pure';
import { hideLayer } from 'utils/mapBoxMap';
const googleMapsAPI = require('google-maps-api')('AIzaSyA-97-nJq7i1hy46cjHJSeOwkKgBdv08aI',
      ['places']);

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
          this.searchPin = window.L.circleMarker(posOfInterest);
          this.searchPin.setRadius(12);
        } else {
          this.searchPin.setLatLng(posOfInterest);
        }
        this.hideMarker(false);
      //   _this.updateLines();
      });
    });
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

GooglePlacesSearch.propTypes = {
  ownerMapObj: React.PropTypes.object,
};

export default pure(GooglePlacesSearch);
