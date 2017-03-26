import React from 'react';
import pure from 'recompose/pure';
import { createPointerLine, showPointerLine } from './../../utils/pointerLineHelpers';
import { hideLayer } from 'utils/mapBoxMap';
import styles from './../styles.css';

const iconSelected = require('assets/images/v_icons_combi/sqr@3x.png');


class MapGF extends React.Component {
  constructor(props) {
    super(props);
    this.containerLayer = null;
    this.theMarker = null;
    this.selectedMarker = null;
    this.theCircle = null;
    this.thePolygon = null;
    this.pointerLine = null;
  }
  componentDidMount() {
    this.containerLayer = this.props.theLayer;
    this.createMarker();
  }
  componentWillUnmount() {
// TODO: need to delete MapBox markers?
    this.toggle(false);
    hideLayer(this.containerLayer, this.thePolygon, true);
    showPointerLine(this.pointerLine, false);
  }
  setPosition(latLng) {
    if (this.theMarker !== null) {
      this.theMarker.setLatLng(latLng);
    }
    if (this.theCircle !== null) {
      this.theCircle.setLatLng(latLng);
    }
  }
  createShapePoly() {
    this.thePolygon = window.L.polygon(this.props.theGF.latLngs)
      .setStyle({ weight: 1 });
    this.containerLayer.addLayer(this.thePolygon);
    const clickHandle = ((inThis) => () => {
      inThis.props.onClick(inThis.props.theGF.id);
    })(this);
    this.thePolygon.on('click', clickHandle);
    this.pointerLine = createPointerLine(this.props.theGF.pos, [0, 0]);
  }
  createShapeCircle() {
    const markerR = 12;
    this.theMarker = window.L.circleMarker(this.props.theGF.pos,
      { title: this.props.theGF.name, weight: 1 })
      .setRadius(markerR);
    const clickHandle = ((inThis) => () => {
      inThis.props.onClick(inThis.props.theGF.id);
    })(this);
    this.theMarker.on('click', clickHandle).addTo(this.containerLayer);
    this.theCircle = window.L.circle(this.props.theGF.pos, this.props.theGF.radius)
      .setStyle({ color: this.context.muiTheme.palette.PLItemBackgroundColorExpanded,
          weight: 1, opacity: 1 });
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
  }
  createMarker() {
    if (this.props.theGF.isPolygon) {
      this.createShapePoly();
    } else {
      this.createShapeCircle();
    }

    this.containerLayer.addLayer(this.pointerLine);
    showPointerLine(this.pointerLine, false);
  }
  expand(doExpand) {
    hideLayer(this.containerLayer, this.theCircle, !doExpand);
    hideLayer(this.containerLayer, this.selectedMarker, !doExpand);

    if (doExpand) {
      if (this.theMarker !== null) {
        this.theMarker.setStyle(
          { color: this.context.muiTheme.palette.PLItemBackgroundColorExpanded });
      }
      if (this.thePolygon !== null) {
        this.thePolygon.setStyle(
        { color: '#e64a19', weight: 2, opacity: 1 }); // this.context.muiTheme.palette.PLItemBackgroundColorExpanded });
      }
    } else {
      if (this.theMarker !== null) {
        this.theMarker.setStyle({ color: '#03f' });
      }
      if (this.thePolygon !== null) {
        this.thePolygon.setStyle({ color: '#03f', weight: 0.5 });
      }
    }
  }
  toggle(doShow) {
    hideLayer(this.containerLayer, this.theMarker, !doShow);
    if (!doShow) {
      this.expand(false);
    }
  }

  render() {
    if (this.theCircle !== null || this.thePolygon !== null) {
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

// export default PureMapGF;

export const mapGFMarkerMaker = (v, gfLayer, onClick = () => {}, isSelected = false, isDetailView = false) => (
      <PureMapGF
        key={v.id}
        isSelected={false}
        isDetailViewActivated={false}
        theLayer={gfLayer}
        theGF={v}
        onClick={onClick}
        isSelected={isSelected}
        isDetailViewActivated={isDetailView}
      />
    );
