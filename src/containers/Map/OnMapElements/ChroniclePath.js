import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { setChronicleNormalizedT } from 'screens/Chronicle/actions';
import { hideLayer } from 'utils/mapBoxMap';

require('containers/Map/leafletStyles.css');
// import styles from './../styles.css';

class ChroniclePath extends React.Component {
  constructor(props) {
    super(props);
    this.thePath = null;
    this.thePathStart = null;
    this.thePathEnd = null;
    this.createPath();
    this.createPathStartEndMarkers();
  }

  componentWillUnmount() {
// TODO: need to delete MapBox markers?
    this.removePath();
  }

  createPathStartEndMarkers() {
    const srcPosArray = this.props.chronicleFrame.posData;
    const headContainerStyle = `padding: 0 3px 0 3px;
    height: 24px;
    width: 50px;
    text-align: center;
    overflow: hidden;
    position: relative;
    bottom: 12px;
    left: -20px;
    background-color: rgba(255, 255, 255, 0.75);
    border: 3px solid orange;
    border-radius: 5px;`;
    this.thePathStart = window.L.marker(srcPosArray[0].pos, {
      icon: window.L.divIcon({
        className: 'drvr-leaflet-div-icon',
        // html: '<span class="my-div-span">START</span>',
        html: `<div style="${headContainerStyle}">
        BEGIN
        </div>`,
      }),
    });
    this.thePathEnd = window.L.marker(srcPosArray[srcPosArray.length - 1].pos, {
      icon: window.L.divIcon({
        className: 'drvr-leaflet-div-icon',
        // html: '<span class="my-div-span">START</span>',
        html: `<div style="${headContainerStyle}">
        END
        </div>`,
      }),
    });
    // this.thePath.addLayer(this.thePathStart);
    hideLayer(this.props.theMap, this.thePathStart, false);
    // this.thePathStart.bringToBack();
    hideLayer(this.props.theMap, this.thePathEnd, false);
    // this.thePathEnd.bringToBack();
    
    // const markerR = 12;
    // this.thePathStart = window.L.circleMarker(latLngArray[0],
    //   { opacity: 1,
    //     fillOpacity: 1,
    //     color: '#e64a19',
    //     fillColor: '#008241',
    //   })
    //   .setRadius(markerR);
    // this.thePathEnd = window.L.circleMarker(latLngArray[latLngArray.length - 1],
    //   { opacity: 1,
    //     fillOpacity: 1,
    //     color: '#e64a19',
    //     fillColor: '#82000d',
    //   })
    //   .setRadius(markerR);
  }

  createPath() {
    const latLngArray = [];
    const srcPosArray = this.props.chronicleFrame.posData;
    for (let i = 0; i < srcPosArray.length; ++i) {
      latLngArray.push(srcPosArray[i].pos);
    }

    const that = this;
    this.thePath = window.L.polyline(latLngArray);
    this.thePath.on('click', (e) => {
      const clickT100 = that.props.chronicleFrame.player.findNormilized100TForPos(e.latlng);
      // console.log('click on ' + clickT100.toFixed(1));
      that.props.setChronicleNormalizedT(clickT100);
    });

    hideLayer(this.props.theMap, this.thePath, false);
    this.thePath.bringToBack();

    this.props.theMap.invalidateSize();
// zoom the map to the PATH
    this.props.theMap.fitBounds(this.thePath.getBounds());
  }
  removePath() {
    if (this.thePath === null) {
      return;
    }
    hideLayer(this.props.theMap, this.thePath, true);
    hideLayer(this.props.theMap, this.thePathStart, true);
    hideLayer(this.props.theMap, this.thePathEnd, true);

    this.thePath = null;
    this.thePathStart = null;
    this.thePathEnd = null;
  }
  highlight(doHighlight) {
    if (this.thePath === null) {
      return;
    }
// TODO: colors from theme
    if (doHighlight) {
      this.thePath.setStyle({
        color: '#e64a19',
        weight: 3,
        opacity: 0.85,
      });
      this.thePath.bringToFront();
      hideLayer(this.props.theMap, this.thePathStart, false);
      hideLayer(this.props.theMap, this.thePathEnd, false);
      // this.thePathStart.bringToFront();
      // this.thePathEnd.bringToFront();

  // zoom the map to the PATH
//      this.props.theMap.fitBounds(this.thePath.getBounds());
    } else {
      this.thePath.setStyle({
        color: '#0A5',
        weight: 2,
        opacity: 0.75,
      });
      hideLayer(this.props.theMap, this.thePathStart, true);
      hideLayer(this.props.theMap, this.thePathEnd, true);
  //    this.thePath.bringToBack();
    }
  }
  render() {
    this.highlight(this.props.isSelected);
    return false;
  }
}

ChroniclePath.propTypes = {
  theMap: PropTypes.object.isRequired,
  chronicleFrame: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setChronicleNormalizedT: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};
const mapState = null;
const mapDispatch = {
  setChronicleNormalizedT,
};
const PureChroniclePath = pure(ChroniclePath);
export default connect(mapState, mapDispatch)(PureChroniclePath);

/* const makeChronoPath = (vehicle, vehCronicleFrame) => {
  if (!vehCronicleFrame.isValid() || !vehCronicleFrame.hasPositions()) {
    return false;
  }
  return (
        <ChroniclePath
          key={`${v.id}CrP`}
          theLayer={this.theMap}
          chronicleFrame={vehCronicleFrame}
          isSelected={this.props.selectedVehicle !== null
            && this.props.selectedVehicle.id === v.id}
        />
      );
};*/
