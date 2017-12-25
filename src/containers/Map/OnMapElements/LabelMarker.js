import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { hideLayer } from 'utils/mapBoxMap';


// const shadow = require('assets/images/v_icons_combi/shadow.png');

require('containers/Map/leafletStyles.css');

class LabelMarker extends React.Component {
  constructor(props) {
    super(props);
    this.theMarker = null;
    this.createMarker();
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    // this._dbgMarker.setLatLng(latLng);
  }

  createMarker() {
    // this._dbgMarker = window.L.marker(this.props.latLng);
    // hideLayer(this.props.theMap, this._dbgMarker, false);

    const lableH = 24;// * iScale;
    const lableW = 200;// * iScale;

    this.pointerIdleSzH = 15;
    this.pointerActiveSzH = 30;
    this.pointerLeftOffset = 16;
    const pointerSzW = 8;

    // const anim = 'all .5s';// cubic-bezier(0.470, -0.310, 0.000, 1.000)';
    // const anim = 'all .25s cubic-bezier(0.680, -0.550, 0.265, 1.550)';
    // const anim = 'all .25s cubic-bezier(0.680, -2.550, 0.265, 3.550)';
    const anim = 'all .3s'; // cubic-bezier(0.680, 0, 0.265, 3.0)';
    const headContainerStyle = `padding: 0 3px 0 3px;
      height: ${lableH}px;
      max-widht: ${lableW}px;
      text-align: center;
      overflow: hidden;
      position: relative;
      bottom: ${this.pointerIdleSzH}px;
      left: ${-this.pointerLeftOffset}px;
      background-color: rgba(255, 255, 255, 0.75);
      border: 3px solid orange;
      border-radius: 5px;
      transition: ${anim};`;
    const pointerContainer = `width:${pointerSzW}px;
      height:${this.pointerActiveSzH}px;
      position: absolute;
      left: ${this.pointerLeftOffset - this.pointerSzW / 2}px;
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
      className: 'drvr-leaflet-div-lable-icon',
      // iconAnchor: [this.pointerLeftOffset, lableH + this.pointerIdleSzH],
      // iconAnchor: [this.pointerLeftOffset + pointerSzW / 2, lableH],
      iconAnchor: [pointerSzW / 2, lableH],
      html: `<div>
          <div style="${headContainerStyle}">
            ${this.props.label}
          </div> 
          <div style="${pointerContainer}">
            <div style="${pointerPointer}"></div>
          </div>
        </div>`,
    });

    this.theMarker = window.L.marker(this.props.latLng,
      { icon: this.markerIcon,
        riseOnHover: true,
      });

    this.theMarker.on('click', () => {
      this.props.onClick();
      // this.clickHandle(this.props.theVehicle.id);
    });

    this.theMarker.on('add', (e) => {
      // this is called when created AMD
      // every time container layer is toggled in
      this.iconElement = e.target._icon;
      this.iconHeadContainerElement = this.iconElement.children[0].children[0];
      this.iconPointerElement = this.iconElement.children[0].children[1].children[0];
      this.toggle(true);
      this.expand(this.props.isSelected);

      // this.expand(this.props.theVehicle.id === this.props.selectedVehicleId);
    });
  }

  toggle(doShow) {
    hideLayer(this.props.theMap, this.theMarker, !doShow);
  }

  expand(doExpand) {
    // #2969c3 -
    // #3388ff - light blue
    const color = doExpand ? '#e64a19' : '#2969c3';

    this.iconHeadContainerElement.style.bottom = doExpand ?
      `${this.pointerActiveSzH}px` : `${this.pointerIdleSzH}px`;
    // this.iconHeadContainerElement.style.fontWeight = doExpand ? 'bold' : '';
    this.iconHeadContainerElement.style.borderColor = color;
    this.iconHeadContainerElement.style.color = color;

    this.iconPointerElement.style.borderTopWidth = doExpand ?
      `${this.pointerActiveSzH}px` : `${this.pointerIdleSzH}px`;
    this.iconPointerElement.style.borderTopColor = color;
    // this.iconPointerElement.style.bottom = doExpand ?
    //       `${this.pointerActiveSzH - this.pointerIdleSzH}px`
    //       : `${tipOffset}px`;
    this.iconPointerElement.style.bottom = doExpand ?
      `${this.pointerActiveSzH}px`
      : `${this.pointerIdleSzH}px`;

    this.theMarker.setZIndexOffset(doExpand ? 2000 : 0);
  }

  render() {
    this.setPosition(this.props.latLng);
    this.toggle(!this.props.hideMe);
    this.expand(this.props.isSelected);

    // this.toggle(!this.props.theVehicle.filteredOut && !this.props.hideMe);
    // this.expand(this.props.theVehicle.id === this.props.selectedVehicleId);
    // showPointerLine(this.pointerLine, !this.props.theVehicle.filteredOut
    //                                   && this.props.isSelected
    //                                   && this.props.isDetailViewActivated);
    return false;
  }
}

LabelMarker.propTypes = {
  theMap: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  latLng: PropTypes.array.isRequired,
  isSelected: PropTypes.bool.isRequired,
  hideMe: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default pure(LabelMarker);
