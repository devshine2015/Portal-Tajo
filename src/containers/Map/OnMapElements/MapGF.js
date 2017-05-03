import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { createPointerLine, showPointerLine } from './../utils/pointerLineHelpers';
import { hideLayer } from 'utils/mapBoxMap';
import { contextActions } from 'services/Global/actions';
import { ctxGetSelectedGFId, ctxGetHideGF } from 'services/Global/reducers/contextReducer';

import styles from './styles.css';

const iconSelected = require('assets/images/v_icons_combi/sqr@3x.png');


class MapGF extends React.Component {
  constructor(props) {
    super(props);
    this.theMarker = null;
    this.selectedMarker = null;
    this.theCircle = null;
    this.thePolygon = null;
    this.pointerLine = null;
  }

  componentDidMount() {
    this.createMarker();
    this.toggle(!this.props.theGF.filteredOut && !this.props.hideMe);
    this.expand(this.props.theGF.id === this.props.selectedGfId);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.theGF.filteredOut !== nextProps.theGF.filteredOut
      || ((this.props.theGF.id === this.props.selectedGfId)
        ^ (nextProps.theGF.id === nextProps.selectedGfId));
  }

  componentWillUnmount() {
// TODO: need to delete MapBox markers?
    this.toggle(false);
    hideLayer(this.props.theMap, this.thePolygon, true);
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
  clickHandle = () => {
    this.props.selectGF(this.props.theGF.id, true);
  }
  createShapePoly() {
    this.thePolygon = window.L.polygon(this.props.theGF.latLngs)
      .setStyle({ weight: 1 });
    this.props.theMap.addLayer(this.thePolygon);
    this.thePolygon.on('click', this.clickHandle);
    this.pointerLine = createPointerLine(this.props.theGF.pos, [0, 0]);
  }
  createShapeCircle() {
    const markerR = 12;
    this.theMarker = window.L.circleMarker(this.props.theGF.pos,
      { title: this.props.theGF.name, weight: 1 })
      .setRadius(markerR);
    this.theMarker.on('click', this.clickHandle).addTo(this.props.theMap);
    this.theCircle = window.L.circle(this.props.theGF.pos, this.props.theGF.radius)
      .setStyle({ color: this.context.muiTheme.palette.PLItemBackgroundColorExpanded,
        weight: 1,
        opacity: 1 });
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

    this.props.theMap.addLayer(this.pointerLine);
    showPointerLine(this.pointerLine, false);
  }
  expand(doExpand) {
    hideLayer(this.props.theMap, this.theCircle, !doExpand);
    hideLayer(this.props.theMap, this.selectedMarker, !doExpand);

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
    hideLayer(this.props.theMap, this.theMarker, !doShow);
    hideLayer(this.props.theMap, this.theCircle, !doShow);
    hideLayer(this.props.theMap, this.thePolygon, !doShow);

    if (!doShow) {
      this.expand(false);
    }
  }

  render() {
    if (this.theCircle !== null || this.thePolygon !== null) {
      this.toggle(!this.props.theGF.filteredOut && !this.props.hideMe);
      this.setPosition(this.props.theGF.pos);
      this.expand(this.props.theGF.id === this.props.selectedGfId);
      // showPointerLine(this.pointerLine, !this.props.theGF.filteredOut
      //                                   && this.props.isSelected
      //                                   && this.props.isDetailViewActivated);
    }
    return false;
  }
}

MapGF.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
MapGF.propTypes = {
  theMap: React.PropTypes.object,
  theGF: React.PropTypes.object,
  selectGF: React.PropTypes.func.isRequired,
  selectedGfId: React.PropTypes.string.isRequired,
  hideMe: React.PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  selectedGfId: ctxGetSelectedGFId(state),
  hideMe: ctxGetHideGF(state),
});
const mapDispatch = {
  selectGF: contextActions.ctxSelectGF,
};

const CompleteMapGF = connect(mapState, mapDispatch)(MapGF);

// export default PureMapGF;

export const mapGFMarkerMaker = (v) => (
  <CompleteMapGF
    key={v.id}
    theMap={null}
    theGF={v}
  />
    );
