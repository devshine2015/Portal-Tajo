import React from 'react';
import ReactDOM from 'react-dom';

import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
const googleMapsAPI = require('google-maps-api')('AIzaSyA-97-nJq7i1hy46cjHJSeOwkKgBdv08aI',
      ['places']);

// require( 'google-maps-api' )( 'your api key', ['places'], function( maps ) {
//
//   //the google.maps object will now have the places api (google.maps.places)
// })
//
// require('https://maps.google.com/maps/api/js?key=AIzaSyA-97-nJq7i1hy46cjHJSeOwkKgBdv08aI&libraries=places');


import styles from './styles.css';

class GooglePlacesSearch extends React.Component {

  componentDidMount() {
    googleMapsAPI().then(maps => {
      const element = ReactDOM.findDOMNode(this);
//      this.searchBox = new google.maps.places.SearchBox(element);
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
      //
      // _this.ddsMap.map.panTo( mapBoxPos );
      // if(_this.searchPin === null){
      //     // _this.searchPin = L.marker( mapBoxPos, {
      //     //   icon: L.mapbox.marker.icon() });
      //     _this.searchPin = L.circleMarker( mapBoxPos);
      //     _this.searchPin.setRadius(3);
      //     _this.searchPin.addTo(_this.ddsMap.map);
      // } else
      //     _this.searchPin.setLatLng( mapBoxPos );
      //   _this.hidePointer(false);
      //   _this.updateLines();
      });
    });
  }

  onSearch = (e) => {
    const value = e.target.value.trim().toLowerCase();

    // const isClearing = value.length < this.state.previousValueLength;
    // this.props.filterFunc(value, isClearing);
    //
    this.setState({
      searchString: value,
    });
  }

  render() {
    return (
      <input className={styles.searchContainer} type="text" placeholder="Search Box" />
    );
  }
}

GooglePlacesSearch.propTypes = {
  ownerMapObj: React.PropTypes.object.isRequired,
};

export default pure(GooglePlacesSearch);
