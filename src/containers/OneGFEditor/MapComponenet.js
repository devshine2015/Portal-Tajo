import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { NEW_GF_RADIUS, NEW_GF_REQUIRED_ZOOM_LEVEL } from 'utils/constants';
// import * as editEvents from './events';
// import * as editorEvents from 'containers/GFEditor/events';
import { gfEditGetSubject, gfEditIsEditing } from 'containers/GFEditor/reducer';
import { gfEditClose, gfEditUpdate } from 'containers/GFEditor/actions';

import { hideLayer } from 'utils/mapBoxMap';
import { addMapMenuItemEx } from 'utils/mapContextMenu';
import { makeLocalGF } from 'services/FleetModel/utils/gfHelpers';

const iconCircle16 = require('assets/images/demo/map-context/add_gf.png');
const iconPoly16 = require('assets/images/demo/map-context/poly_gf.png');

function handleMultiPolyline(latLngs) {
  // its a multi-polyLine, use the first ring
  if (latLngs[0].lat === undefined) {
    return latLngs[0];
  }
  // its just a polyline
  return latLngs;
}

class EditGF extends React.Component {
  constructor(props) {
    super(props);
    this.theCircle = null;
    this.thePolygon = null;
    this.polygonDrawer = null;
    this.drawLayer = null;
  }

  componentDidMount() {
    addMapMenuItemEx(this.props.theMap,
      { text: this.context.translator.getTranslation('ctx_add_circular'),
        icon: iconCircle16,
        callback: e => this.startCircular(e.latlng),
      });
    addMapMenuItemEx(this.props.theMap,
      { text: this.context.translator.getTranslation('ctx_add_poly'),
        icon: iconPoly16,
        callback: e => this.startPolygon(e.latlng),
      });
  }

  onDrawStop() {
    if (this.thePolygon === null) {
      this.props.gfEditClose();
    }
  }

  setPosition(latLng) {
    if (this.theCircle === null) return;
    this.theCircle.editing.disable();
    this.theCircle.setLatLng(latLng);
    this.theCircle.editing.enable();
  }

  setRadius(newR) {
    if (this.theCircle === null) return;
    this.theCircle.editing.disable();
    this.theCircle.setRadius(newR);
    this.theCircle.editing.enable();
  }

  applyPolygon(e) {

    const polygon = e.layer;
    this.props.subjectGF.latLngs = handleMultiPolyline(polygon.getLatLngs());
    this.thePolygon = window.L.polygon(this.props.subjectGF.latLngs);
    this.props.gfEditUpdate(this.props.subjectGF);
    hideLayer(this.props.theMap, this.thePolygon, false);
    this.thePolygon.editing.enable();
    this.thePolygon.on('edit', () => {
      this.props.subjectGF.latLngs = handleMultiPolyline(this.thePolygon.getLatLngs());
      this.props.gfEditUpdate(this.props.subjectGF);
    });
  }

  startCircular(latLng) {
    this.props.gfEditUpdate(makeLocalGF({ center: latLng }));
    this.theCircle = window.L.circle(latLng, NEW_GF_RADIUS);
    this.theCircle.editing.enable();
    this.theCircle.on('edit', () => {
      this.props.subjectGF.pos = this.theCircle.getLatLng();
      this.props.subjectGF.radius = Math.round(this.theCircle.getRadius());
      this.props.gfEditUpdate(this.props.subjectGF);
    });

    hideLayer(this.props.theMap, this.theCircle, false);

    // for circular GFs - make sure we are on some sane zoom level, not too far
    if (this.props.theMap.getZoom() < NEW_GF_REQUIRED_ZOOM_LEVEL) {
      this.props.theMap.setZoomAround(this.props.subjectGF.pos, NEW_GF_REQUIRED_ZOOM_LEVEL);
    }
  }

  startPolygon(latLng) {
    this.props.gfEditUpdate(makeLocalGF({ points: [latLng], kind: 'poly' }));
    const polygonOptions = {
      // showArea: false,
      allowIntersection: false,
      shapeOptions: {
        stroke: true,
        color: '#6e83f0',
        weight: 4,
        opacity: 0.5,
        fill: true,
        // fillColor: '#6ef0e0', // same as color by default
        fillOpacity: 0.2,
        clickable: true,
      },
    };
    this.props.theMap.on('draw:created', this.applyPolygon, this);
    this.props.theMap.on('draw:drawstop', this.onDrawStop, this);
    // if (this.drawLayer === null) {
    //   this.drawLayer = window.L.layerGroup();
    // }
    // hideLayer(this.props.theMap, this.drawLayer, false);
    this.polygonDrawer = new window.L.Draw.Polygon(this.props.theMap, polygonOptions);
    this.polygonDrawer.enable();
    this.polygonDrawer.addVertex(latLng);
  }

  hideAll() {
    try {
      hideLayer(this.props.theMap, this.theCircle, true);
    } catch (err) {
      console.log(`circle Edit error: ${err}`);
    }
    hideLayer(this.props.theMap, this.thePolygon, true);
    hideLayer(this.props.theMap, this.polygonDrawer, true);
    this.polygonDrawer = null;
    this.theCircle = null;
  }

  render() {
    if (!this.props.gfEditMode) {
      this.hideAll();
      return false;
    }
    this.setPosition(this.props.subjectGF.pos);
    this.setRadius(this.props.subjectGF.radius);
    return false;
  }
}

EditGF.propTypes = {
  theMap: PropTypes.object.isRequired,
  gfEditMode: PropTypes.bool.isRequired,
  subjectGF: PropTypes.object,
  gfEditUpdate: PropTypes.func.isRequired,
  gfEditClose: PropTypes.func.isRequired,
};
EditGF.contextTypes = {
  translator: PropTypes.object.isRequired,
};

EditGF.defaultProps = {
  subjectGF: {},
};

const mapState = state => ({
  subjectGF: gfEditGetSubject(state),
  gfEditMode: gfEditIsEditing(state),
});
const mapDispatch = {
  gfEditUpdate,
  gfEditClose,
};

export default connect(mapState, mapDispatch)(pure(EditGF));
