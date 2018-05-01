import React from 'react';

//
// TODO: animated marker in/out (groe with bounce?)
//
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getVehicleByValue } from 'services/FleetModel/utils/vehiclesMap';
import { hideLayer, latLngMoveTo } from 'utils/mapBoxMap';
import { createPointerLine, showPointerLine } from './../utils/pointerLineHelpers';
import { isMaritime } from 'configs';

import { contextActions } from 'services/Global/actions';
import { ctxGetSelectedVehicleId, ctxGetHideVehicles } from 'services/Global/reducers/contextReducer';

// const shadow = require('assets/images/v_icons_combi/shadow.png');

require('containers/Map/leafletStyles.css');

class MapVehicle extends React.Component {
  constructor(props) {
    super(props);
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
    this.createMarker();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.theVehicle.pos !== nextProps.theVehicle.pos
      || this.props.theVehicle.filteredOut !== nextProps.theVehicle.filteredOut
      || ((this.props.theVehicle.id === this.props.selectedVehicleId)
        ^ (nextProps.theVehicle.id === nextProps.selectedVehicleId));
  }

  setPosition(latLng) {
    this.theMarker.setLatLng(latLng);
    this.pointerLine.setLatLng(latLng);
    if (this.theMoveCircle !== null) {
      this.theMoveCircle.setLatLng(latLng);
    }
  }

  clickHandle = () => {
    this.props.selectVehicle(this.props.theVehicle.id, true);
  }

  createMarker() {
    const headSz = 104;

    this.pointerIdleSzH = 0;
    this.pointerActiveSzH = 0;
    const pointerSzW = 0;

    const anim = 'all .2s';
    const headContainerStyle = `width: 104px; 
      height: 132px; 
      position: relative;
      transition: ${anim}`;
    const headFrameStyle = `width: 104px; 
      height: 132px;
      position: absolute;
      bottom: 0px;`;
    const pointerContainer = `width:0px;
      height:0px;
      position: absolute;
      left: ${(headSz / 2) - (pointerSzW / 2)}px;
      pointer-events: none;`;
    const pointerPointer = `
      position: relative;
      transform: none;
      pointer-events: none;`;

    this.markerIcon = window.L.divIcon({
      className: 'drvr-leaflet-div-icon',
      iconAnchor: [headSz / 2, headSz + this.pointerIdleSzH],
      html: `<div>
          <div style="${headContainerStyle}">
            <svg width="104" height="132" viewBox="0 0 124 151"><defs><linearGradient id="c" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#0076FF"/><stop offset="100%" stop-color="#00FF80"/></linearGradient><path id="b" d="M52 132c34.667-27.52 52-54.187 52-80 0-28.719-23.281-52-52-52S0 23.281 0 52c0 25.813 17.333 52.48 52 80z"/><filter id="a" width="133.7%" height="126.5%" x="-16.8%" y="-9.5%" filterUnits="objectBoundingBox"><feOffset dy="5" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="5"/><feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/></filter><linearGradient id="e" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#FF2A68"/><stop offset="100%" stop-color="#FF5E3A"/></linearGradient><circle id="d" cx="45" cy="45" r="45"/></defs><g fill="none" fill-rule="evenodd"><g transform="translate(10 5)"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="url(#c)" xlink:href="#b"/></g><g transform="translate(17 12)"><mask id="f" fill="#fff"><use xlink:href="#d"/></mask><use fill="url(#e)" xlink:href="#d"/><g fill="#FFF" mask="url(#f)"><g transform="translate(11 31)"><path d="M45.25 44.376c0 .62-.503 1.125-1.125 1.125h-2.25a1.125 1.125 0 1 1 0-2.25h2.25c.622 0 1.125.504 1.125 1.125zm22.5 0c0 .62-.503 1.125-1.125 1.125h-18a1.125 1.125 0 1 1 0-2.25h18c.622 0 1.125.504 1.125 1.125zm-31.5 0c0 .62-.503 1.125-1.125 1.125h-11.25a1.125 1.125 0 1 1 0-2.25h11.25c.622 0 1.125.504 1.125 1.125zm-18 0c0 .62-.503 1.125-1.125 1.125H1.375a1.125 1.125 0 1 1 0-2.25h15.75c.622 0 1.125.504 1.125 1.125zM30.625 34.25a1.126 1.126 0 0 1 0-2.25 1.126 1.126 0 0 1 0 2.25zm0-4.5a3.38 3.38 0 0 0-3.375 3.375 3.38 3.38 0 0 0 3.375 3.375A3.38 3.38 0 0 0 34 33.126a3.38 3.38 0 0 0-3.375-3.375zm-18 4.5a1.126 1.126 0 0 1 0-2.25 1.126 1.126 0 0 1 0 2.25zm0-4.5a3.38 3.38 0 0 0-3.375 3.375 3.38 3.38 0 0 0 3.375 3.375A3.38 3.38 0 0 0 16 33.126a3.38 3.38 0 0 0-3.375-3.375zm42.75 4.5a1.126 1.126 0 0 1 0-2.25 1.126 1.126 0 0 1 0 2.25zm0-4.5A3.38 3.38 0 0 0 52 33.126a3.38 3.38 0 0 0 3.375 3.375 3.38 3.38 0 0 0 3.375-3.375 3.38 3.38 0 0 0-3.375-3.375zm0 9a5.631 5.631 0 0 1-5.625-5.625 5.631 5.631 0 0 1 5.625-5.625A5.631 5.631 0 0 1 61 33.126a5.631 5.631 0 0 1-5.625 5.625zm-10.125-36h7.875c1.958 0 3.65 1.967 4.593 3.826L60.502 14H56.07l1.437-2.872a1.126 1.126 0 0 0-2.014-1.006L53.555 14H45.25V2.75zm-14.625 36A5.631 5.631 0 0 1 25 33.126a5.631 5.631 0 0 1 5.625-5.625 5.631 5.631 0 0 1 5.625 5.625 5.631 5.631 0 0 1-5.625 5.625zm35.67-21.046l-3.203-3.202-3.288-8.772a1.564 1.564 0 0 0-.047-.108C58.153 2.416 55.674.5 53.125.5h-9C43.503.5 43 1.005 43 1.626V32h-4.59c-.548-3.81-3.825-6.75-7.785-6.75-4.341 0-7.875 3.532-7.875 7.875 0 4.342 3.534 7.875 7.875 7.875 3.96 0 7.237-2.94 7.785-6.75h5.715c.622 0 1.125-.504 1.125-1.125V16.25h16.41l3.045 3.045c.64.641.793 2.116.795 2.58V23h-1.125a1.125 1.125 0 1 0 0 2.25H65.5V32h-2.34c-.548-3.81-3.825-6.75-7.785-6.75-4.341 0-7.875 3.532-7.875 7.875 0 4.342 3.534 7.875 7.875 7.875 3.96 0 7.237-2.94 7.785-6.75h3.465c.622 0 1.125-.504 1.125-1.125v-11.25c0-.278-.04-2.758-1.455-4.17zM12.625 38.75A5.631 5.631 0 0 1 7 33.126a5.631 5.631 0 0 1 5.625-5.625 5.631 5.631 0 0 1 5.625 5.625 5.631 5.631 0 0 1-5.625 5.625zm0-13.5c-4.341 0-7.875 3.532-7.875 7.875S8.284 41 12.625 41s7.875-3.533 7.875-7.875c0-4.343-3.534-7.875-7.875-7.875z"/><rect width="2.25" height="29.25" x=".25" y="2.75" rx="1.125"/><rect width="2.25" height="41.625" x="20.5" y="-17.5" rx="1.125" transform="rotate(90 21.625 3.313)"/></g></g></g></g></svg>
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
      this.clickHandle(this.props.theVehicle.id);
    });

    this.theMarker.on('add', (e) => {
      // this is called when created AMD
      // every time container layer is toggled in
      this.iconElement = e.target._icon;
      this.iconHeadContainerElement = this.iconElement.children[0].children[0];
      this.iconHeadFrameElement = this.iconElement.children[0].children[0].children[1];
      this.iconPointerElement = this.iconElement.children[0].children[1].children[0];
      this.toggle(!this.props.theVehicle.filteredOut);
      this.expand(this.props.theVehicle.id === this.props.selectedVehicleId);
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
    this.props.theMap.addLayer(this.pointerLine);
    showPointerLine(this.pointerLine, false);
  }

  toggle(doShow) {
    hideLayer(this.props.theMap, this.theMarker, !doShow);
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
        hideLayer(this.props.theMap, this.theMoveCircle, false);
        this.theMoveCircle.setRadius(this.props.theVehicle.estimatedTravelKm * 1000);
        hideLayer(this.props.theMap, this.theDirectionLine, false);
        this.theDirectionLine.setLatLngs([this.props.theVehicle.pos,
          latLngMoveTo(window.L.latLng(this.props.theVehicle.pos),
            this.props.theVehicle.heading,
            this.props.theVehicle.estimatedTravelKm)]);
      }
    } else {
      hideLayer(this.props.theMap, this.theMoveCircle, true);
      hideLayer(this.props.theMap, this.theDirectionLine, true);
    }
  }

  render() {
    if (this.theMarker !== null) {
      this.setPosition(this.props.theVehicle.pos);
      this.toggle(!this.props.theVehicle.filteredOut && !this.props.hideMe);
      this.expand(this.props.theVehicle.id === this.props.selectedVehicleId);
      // showPointerLine(this.pointerLine, !this.props.theVehicle.filteredOut
      //                                   && this.props.isSelected
      //                                   && this.props.isDetailViewActivated);
    }
    return false;
  }
}

MapVehicle.propTypes = {
  theMap: PropTypes.object,
  theVehicle: PropTypes.object.isRequired,
  selectedVehicleId: PropTypes.string.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  hideMe: PropTypes.bool.isRequired,
};

MapVehicle.defaultProps = {
  theMap: null,
};

const mapState = (state) => ({
  selectedVehicleId: ctxGetSelectedVehicleId(state),
  hideMe: ctxGetHideVehicles(state),
});
const mapDispatch = {
  selectVehicle: contextActions.ctxSelectVehicle,
};

const CompleteVehicle = connect(mapState, mapDispatch)(MapVehicle);

export const mapVehicleMarkerMaker = (v) => (
  <CompleteVehicle
    key={v.id}
    theMap={null}
    theVehicle={v}
  />
    );
