import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { NEW_GF_RADIUS, NEW_GF_REQUIRED_ZOOM_LEVEL } from 'utils/constants';
// import * as editEvents from './events';
// import * as editorEvents from 'containers/GFEditor/events';
import { gfEditGetSubject } from 'containers/GFEditor/reducer';
import { gfEditClose, gfEditUpdate } from 'containers/GFEditor/actions';

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
    this.theLayer = null;
    this.theCircle = null;
    this.thePolygon = null;
    this.polygonDrawer = null;
  }

  componentDidMount() {
    this.theLayer = window.L.layerGroup();
    this.props.theMap.addLayer(this.theLayer);

    if (this.props.subjectGF.isPolygon) {
      this.startPolygon();
      return;
    }
    this.startCircular();
  }

  componentWillUnmount() {
    this.props.theMap.removeLayer(this.theLayer);
    this.theLayer = null;
    if (this.polygonDrawer !== null) {
      this.props.theMap.off('draw:created', this.applyPolygon, this);
      this.props.theMap.off('draw:drawstop', this.onDrawStop, this);
      this.polygonDrawer = null;
    }
  }

  startCircular() {
    this.theCircle = window.L.circle(this.props.subjectGF.pos, NEW_GF_RADIUS);
    this.theCircle.editing.enable();
    this.theCircle.on('edit', () => {
      this.props.subjectGF.pos = this.theCircle.getLatLng();
      this.props.subjectGF.radius = Math.round(this.theCircle.getRadius());
      this.props.gfEditUpdate(this.props.subjectGF);
    });
    this.theLayer.addLayer(this.theCircle);

    // for circular GFs - make sure we are on some sane zoom level, not too far
    if (this.props.theMap.getZoom() < NEW_GF_REQUIRED_ZOOM_LEVEL) {
      this.props.theMap.setZoomAround(this.props.subjectGF.pos, NEW_GF_REQUIRED_ZOOM_LEVEL);
    }
  }

  startPolygon() {
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

    this.polygonDrawer = new window.L.Draw.Polygon(this.props.theMap, polygonOptions);
    this.polygonDrawer.enable();
    this.polygonDrawer.addVertex(this.props.subjectGF.pos);
  }

  onDrawStop() {
    if (this.thePolygon === null) {
      this.props.gfEditClose();
    }
  }

  applyPolygon(e) {
    // e.type will be the type of layer that has been draw
    // (polyline, marker, polygon, rectangle, circle)
    // const type = e.layerType;
    const polygon = e.layer;
    this.props.subjectGF.latLngs = handleMultiPolyline(polygon.getLatLngs());
    // this can be called two times for the sale poly (dblClick?)
    // so, make sure we have only one editable polygon
    if (this.thePolygon === null) {
      this.thePolygon = window.L.polygon(this.props.subjectGF.latLngs);
    }
    this.props.gfEditUpdate(this.props.subjectGF);
    this.theLayer.addLayer(this.thePolygon);
    this.thePolygon.editing.enable();
    this.thePolygon.on('edit', () => {
      this.props.subjectGF.latLngs = handleMultiPolyline(polygon.getLatLngs());
      this.props.gfEditUpdate(this.props.subjectGF);
    });
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

  render() {
    this.setPosition(this.props.subjectGF.pos);
    this.setRadius(this.props.subjectGF.radius);
    return false;
  }
}

EditGF.propTypes = {
  theMap: React.PropTypes.object.isRequired,
  subjectGF: React.PropTypes.object.isRequired,
  gfEditUpdate: React.PropTypes.func.isRequired,
  gfEditClose: React.PropTypes.func.isRequired,
};
const mapState = (state) => ({
  subjectGF: gfEditGetSubject(state),
});
const mapDispatch = {
  gfEditUpdate,
  gfEditClose,
};

const PureEditGF = pure(EditGF);

export default connect(mapState, mapDispatch)(PureEditGF);
