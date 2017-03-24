import React from 'react';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseSearchIcon from 'material-ui/svg-icons/navigation/close';
import { hideLayer } from 'utils/mapBoxMap';

import classes from './classes';

const googleMapsAPI = require('google-maps-api')('AIzaSyA-97-nJq7i1hy46cjHJSeOwkKgBdv08aI',
      ['places']);
const iconPointer = require('assets/images/v_icons_combi/pointerArrow.png');

const STYLES = {
  icon: {
    padding: 6,
    width: 36,
    height: 36,
  },
  input: {
    paddingRight: 20,
  },
};

class GooglePlacesSearch extends React.Component {
  constructor(props) {
    super(props);

    this.searchPin = null;

    this.state = {
      isOpened: false,
      value: '',
    };
  }

  componentDidMount() {
    // maybe be using it without map as well
    this.setUpOnMap();
  }

  onChange = (e) => {
    const value = e.target.value;
    const isClearing = value.length < this.state.value.length;

    this.setState({
      value,
    });
    if (isClearing) {
      this.hideMarker(true);
    }
  }

  onSearchClick = () => {
    this.setState({
      isOpened: true,
    }, () => {
      this.textField.focus();
    });
  }

  onCloseClick = () => {
    this.setState({
      isOpened: false,
      value: '',
    }, () => {
      this.textField.blur();
      this.hideMarker(true);
    });
  }

  setUpOnMap() {
    googleMapsAPI().then(maps => {
      this.searchBox = new maps.places.SearchBox(this.textField.input);

      maps.event.addListener(this.searchBox, 'places_changed', () => {
        const places = this.searchBox.getPlaces();
        if (places.length < 1) {
          return;
        }
  // use the first one
        const place = places[0];

        const bounds = new window.google.maps.LatLngBounds();

        bounds.union(place.geometry.viewport);

        const northeast = bounds.getNorthEast();
        const southwest = bounds.getSouthWest();

        const posOfInterest = window.L.latLng(place.geometry.location.lat(),
            place.geometry.location.lng());
        this.props.ownerMapObj.fitBounds([
          [northeast.lat(), northeast.lng()],
          [southwest.lat(), southwest.lng()],
        ]);
        if (this.searchPin === null) {
          // this.searchPin = window.L.circleMarker(posOfInterest,
          //   {
          //     className: css(classes.animatedS),
          //   });
          // this.searchPin.setRadius(12);
          const iScale = 0.15;
          const iW = 152 * iScale;
          const iH = 253 * iScale;
          this.selectedMarkerIcon = window.L.icon({
            iconUrl: iconPointer,
            iconSize: [iW, iH],
            iconAnchor: [0, iH],
            className: css(classes.animatedS),
          });
          this.searchPin = window.L.marker(posOfInterest,
            {
              // title: this.props.theGF.name,
              // icon: this.selectedMarkerIcon,
              riseOnHover: true,
            });
          this.searchPin.setZIndexOffset(2000);
        } else {
          this.searchPin.setLatLng(posOfInterest);
        }
        this.hideMarker(false);

        this.setState({
          value: this.textField.input.value,
        });
      });
    });
  }

  hideMarker(doHide) {
    hideLayer(this.props.ownerMapObj, this.searchPin, doHide);
  }

  saveRef = ref => {
    if (!ref) return;

    this.textField = ref;
  }

  closeOnEsc = e => {
    // if esc pressed
    if (this.state.isOpened && e.keyCode === 27) {
      this.onCloseClick();
    }
  }

  render() {
    const { isOpened } = this.state;
    const containerClassName = css(classes.container,
      isOpened ? classes.container_open : classes.container_closed
    );
    const searchIconClassName = css(classes.icon,
      isOpened ? classes.icon_hide : classes.icon_show,
    );
    const closeIconClassName = css(classes.icon,
      isOpened ? classes.icon_show : classes.icon_hide,
    );

    return (
      <div className={containerClassName}>
        <SearchIcon
          className={searchIconClassName}
          onClick={this.onSearchClick}
          style={STYLES.icon}
          hoverColor={this.context.muiTheme.palette.primary1Color}
        />
        <CloseSearchIcon
          className={closeIconClassName}
          onClick={this.onCloseClick}
          style={STYLES.icon}
          hoverColor={this.context.muiTheme.palette.accent1Color}
        />
        <TextField
          fullWidth
          className={css(classes.input)}
          style={{
            width: isOpened ? '100%' : 0,
          }}
          onKeyDown={this.closeOnEsc}
          inputStyle={STYLES.input}
          value={this.state.value}
          name="places"
          onChange={this.onChange}
          ref={this.saveRef}
          placeholder="Search for places"
        />
      </div>
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
