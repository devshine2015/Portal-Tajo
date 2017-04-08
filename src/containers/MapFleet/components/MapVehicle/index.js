//
// TODO: animated marker in/out (groe with bounce?)
//
import React from 'react';
import pure from 'recompose/pure';
import { getVehicleByValue } from 'services/FleetModel/utils/vehiclesMap';
import { hideLayer, latLngMoveTo } from 'utils/mapBoxMap';
import { createPointerLine, showPointerLine } from './../../utils/pointerLineHelpers';
import { isMaritime } from 'configs';
// const shadow = require('assets/images/v_icons_combi/shadow.png');

require('containers/MapFleet/leafletStyles.css');

class MapVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.theLayer = null;
    this.theMarker = null;
    this.markerIcon = null;
    this.markerIconSelected = null;
    this.popUp = null;
    this.pointerLine = null;
    this.theDirectionLine = null;
    this.iconElement = null;
    this.iconHeadContainerElement = null;
    this.iconHeadFrameElement = null;
    this.iconPointerElement = null;
  }

  componentDidMount() {
    this.theLayer = this.props.theLayer;
    this.createMarker();
    this.setPosition(this.props.theVehicle.pos);
    this.toggle(!this.props.theVehicle.filteredOut);
    this.expand(this.props.isSelected);

    // hideLayer(this.theLayer, window.L.marker(this.props.theVehicle.pos), false);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.theVehicle.pos !== nextProps.theVehicle.pos
      || this.props.theVehicle.estimatedTravelKm !== nextProps.theVehicle.estimatedTravelKm
      || this.props.theVehicle.filteredOut !== nextProps.theVehicle.filteredOut
      || this.props.isSelected !== nextProps.isSelected
      || (this.props.isSelected
          && this.props.isDetailViewActivated !== nextProps.isDetailViewActivated);
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.pointerLine.setLatLng(latLng);
    if (this.theMoveCircle !== null) {
      this.theMoveCircle.setLatLng(latLng);
    }
  }
  createMarker() {
    const iScale = 0.25;
    const headSz = 152 * iScale;

    this.pointerIdleSzH = 7;
    this.pointerActiveSzH = 30;
    const pointerSzW = 14;

    const iconImg = getVehicleByValue(this.props.theVehicle.original.kind).pic;

    const anim = 'all .5s';// cubic-bezier(0.470, -0.310, 0.000, 1.000)';
    const headContainerStyle = `width: ${headSz}px; 
      height: ${headSz}px; 
      position: relative;
      bottom: 20px;
      transition: ${anim};`;
    const headFrameStyle = `width: ${headSz}px; 
      height: ${headSz}px; 
      border-radius: 50%; 
      border: 3px solid orange;
      position: absolute;
      bottom: 0px;
      transition: ${anim};`;
    const pointerContainer = `width:${pointerSzW}px;
      height:${this.pointerActiveSzH}px;
      position: absolute;
      left: ${headSz / 2 - pointerSzW / 2}px; 
      pointer-events: none;`;
    const pointerPointer = `border-left: ${pointerSzW / 2}px solid transparent;
      border-right: ${pointerSzW / 2}px solid transparent;
      border-top: ${this.pointerIdleSzH}px solid orange;
      position: relative;
      bottom: 0px;
      transform: none;
      background: none;
      pointer-events: none;
      transition: ${anim};`;

    this.markerIcon = window.L.divIcon({
      className: 'drvr-leaflet-div-icon',
      iconAnchor: [headSz / 2, headSz + this.pointerIdleSzH],
      html: `<div>
          <div style="${headContainerStyle}">
            <img src="${iconImg}" height="${headSz}" width="${headSz}">
            <div style="${headFrameStyle}"></div>
          </div> 
          <div style="${pointerContainer}">
            <div style="${pointerPointer}"></div>
          </div>
        </div>`,
    });

    this.theMarker = window.L.marker(this.props.theVehicle.pos,
      { title: this.props.theVehicle.original.name,
        icon: this.markerIcon,
        riseOnHover: true,
      });
    this.theMoveCircle = isMaritime ? window.L.circle(this.props.theVehicle.pos,
      10,
      { opacity: 1,
        fillOpacity: 0.3,
        color: '#1f757d',
        fillColor: '#1f757d',
        dashArray: '5, 5',
        weight: 1,
       })
       : null;
    this.theDirectionLine = isMaritime ? window.L.polyline([this.props.theVehicle.pos,
          this.props.theVehicle.pos],
       { opacity: 1,
         color: '#1f757d',
         dashArray: '5, 5',
         weight: 1,
        })
        : null;

    this.theMarker.on('click', () => {
      this.props.onClick(this.props.theVehicle.id);
    });

    this.theMarker.on('add', (e) => {
      // this is called when created AMD
      // every time container layer is toggled in
      this.iconElement = e.target._icon;
      this.iconHeadContainerElement = this.iconElement.children[0].children[0];
      this.iconHeadFrameElement = this.iconElement.children[0].children[0].children[1];
      this.iconPointerElement = this.iconElement.children[0].children[1].children[0];
      this.toggle(!this.props.theVehicle.filteredOut);
      this.expand(this.props.isSelected);
    });

    this.popUp = window.L.popup({
//        offset: [0, -this.iconSize*1.85],
//          className: 'ddsMapPopUp',
//        minWidth: 150,
      closeButton: false,
      closeOnClick: true,
      autoPan: false,
      keepInView: false,
      zoomAnimation: true,
    }).setContent(this.props.theVehicle.original.name);

    this.pointerLine = createPointerLine(this.props.theVehicle.pos,
      [headSz / 2, this.pointerActiveSzH + headSz / 2]);
    this.theLayer.addLayer(this.pointerLine);
    showPointerLine(this.pointerLine, false);
  }

  toggle(doShow) {
    hideLayer(this.theLayer, this.theMarker, !doShow);
  }

  expand(doExpand) {
    const tipOffset = 2;
// #2969c3 -
// #3388ff - light blue
    const color = doExpand ? '#e64a19' : '#2969c3';

    this.iconHeadContainerElement.style.bottom = doExpand ? '20px' : '0px';
    this.iconHeadFrameElement.style.borderColor = color;

    this.iconPointerElement.style.borderTopWidth = doExpand ?
          `${this.pointerActiveSzH - tipOffset}px` : `${this.pointerIdleSzH}px`;
    this.iconPointerElement.style.borderTopColor = color;
    this.iconPointerElement.style.bottom = doExpand ?
          `${this.pointerActiveSzH - this.pointerIdleSzH}px`
          : `${tipOffset}px`;

    this.theMarker.setZIndexOffset(doExpand ? 2000 : 0);

    if (doExpand) {
      if (this.theMoveCircle !== null) {
        const radius = this.props.theVehicle.estimatedTravelKm * 1000;
        // no display estimated move circle if distance is too small
        if (radius < 25) {
          return;
        }
        hideLayer(this.theLayer, this.theMoveCircle, false);
        this.theMoveCircle.setRadius(this.props.theVehicle.estimatedTravelKm * 1000);
        hideLayer(this.theLayer, this.theDirectionLine, false);
        this.theDirectionLine.setLatLngs([this.props.theVehicle.pos,
          latLngMoveTo(window.L.latLng(this.props.theVehicle.pos),
            this.props.theVehicle.heading,
            this.props.theVehicle.estimatedTravelKm)]);
      }
    } else {
      hideLayer(this.theLayer, this.theMoveCircle, true);
      hideLayer(this.theLayer, this.theDirectionLine, true);
    }
  }

  render() {
    if (this.theMarker !== null) {
      this.setPosition(this.props.theVehicle.pos);
      this.toggle(!this.props.theVehicle.filteredOut);
      this.expand(this.props.isSelected);
      showPointerLine(this.pointerLine, !this.props.theVehicle.filteredOut
                                        && this.props.isSelected
                                        && this.props.isDetailViewActivated);
    }
    return false;
  }
}

MapVehicle.propTypes = {
  theLayer: React.PropTypes.object,
  theVehicle: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  isDetailViewActivated: React.PropTypes.bool.isRequired,
};

export default pure(MapVehicle);
