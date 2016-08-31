import React from 'react';
import pure from 'recompose/pure';
import { createPointerLine, showPointerLine } from './../../utils/pointerLineHelpers';
import styles from './../styles.css';

const iconSelected = require('assets/images/v_icons_combi/sqr@3x.png');


class MapGF extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = null;
    this.theMarker = null;
    this.theCircle = null;
    this.pointerLine = null;
  }

  componentDidMount() {
    this.containerLayer = this.props.theLayer;
    this.createMarker();
  }
  componentWillUnmount() {
    this.toggle(false);
  }
  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.theCircle.setLatLng(latLng);
  }
  createMarker() {
    const markerR = 12;
    this.theMarker = window.L.circleMarker(this.props.theGF.pos,
      { title: this.props.theGF.name })
      .setRadius(markerR);
    const clickHandle = ((inThis) => () => {
      inThis.props.onClick(inThis.props.theGF.id);
    })(this);
    this.theMarker.on('click', clickHandle).addTo(this.containerLayer);

    this.theCircle = window.L.circle(this.props.theGF.pos, this.props.theGF.radius)
      .setStyle({ color: this.context.muiTheme.palette.PLItemBackgroundColorExpanded });

    const iScale = 0.25;
    const headSz = 152 * iScale;
    this.selectedMarkerIcon = window.L.icon({
      iconUrl: iconSelected,
      iconSize: [headSz, headSz],
      iconAnchor: [headSz / 2, headSz / 2],
      className: styles.animatedS,
    });
    this.selectedMarker = window.L.marker(this.props.theGF.pos,
      { title: this.props.theGF.name,
        icon: this.selectedMarkerIcon,
        riseOnHover: true,
      });
    this.selectedMarker.setZIndexOffset(2000);

    this.pointerLine = createPointerLine(this.props.theGF.pos, [headSz / 2, 0]);
    this.containerLayer.addLayer(this.pointerLine);
    showPointerLine(this.pointerLine, false);
  }
  expand(doExpand) {
    if (doExpand) {
      this.theMarker.setStyle(
        { color: this.context.muiTheme.palette.PLItemBackgroundColorExpanded });
      this.containerLayer.addLayer(this.theCircle);
      this.containerLayer.addLayer(this.selectedMarker);

//      showPointerLine(this.pointerLine, true);
    } else {
      this.theMarker.setStyle({ color: '#03f' });
      if (this.containerLayer.hasLayer(this.theCircle)) {
        this.containerLayer.removeLayer(this.theCircle);
      }
      if (this.containerLayer.hasLayer(this.selectedMarker)) {
        this.containerLayer.removeLayer(this.selectedMarker);
      }
//      showPointerLine(this.pointerLine, false);
    }
  }
  toggle(doShow) {
    if (doShow) {
      if (!this.containerLayer.hasLayer(this.theMarker)) {
        this.containerLayer.addLayer(this.theMarker);
      }
    } else {
      if (this.containerLayer.hasLayer(this.theMarker)) {
        this.containerLayer.removeLayer(this.theMarker);
      }
      this.expand(false);
    }
  }

  render() {
    if (this.theMarker !== null) {
      this.toggle(!this.props.theGF.filteredOut);
      this.setPosition(this.props.theGF.pos);
      this.expand(this.props.isSelected);
      showPointerLine(this.pointerLine, !this.props.theGF.filteredOut
                                        && this.props.isSelected
                                        && this.props.isDetailViewActivated);
    }
    return false;
  }
}


MapGF.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
MapGF.propTypes = {
  theLayer: React.PropTypes.object,
  theGF: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  isDetailViewActivated: React.PropTypes.bool.isRequired,
};
const PureMapGF = pure(MapGF);

export default PureMapGF;
