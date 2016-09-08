import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { NEW_GF_RADIUS } from 'utils/constants';
import * as editEvents from './events';
import * as editorEvents from 'containers/GFEditor/events';
import { gfEditGetSubject } from 'containers/GFEditor/reducer';
import { gfEditUpdate } from 'containers/GFEditor/actions';


class EditGF extends React.Component {
  constructor(props) {
    super(props);
    this.theLayer = null;
    this.theCircle = null;
  }

  componentDidMount() {
    this.theLayer = this.props.theLayer;

    this.theCircle = window.L.circle(this.props.subjectGF.pos, NEW_GF_RADIUS);
    this.theCircle.editing.enable();
    this.theCircle.on('edit', () => {
      this.props.subjectGF.pos = this.theCircle.getLatLng();
      this.props.subjectGF.radius = Math.round(this.theCircle.getRadius());
      this.props.gfEditUpdate(this.props.subjectGF);
    });
    this.theLayer.addLayer(this.theCircle);
  }

  componentWillUnmount() {
    this.theLayer.removeLayer(this.theCircle);
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
  theLayer: React.PropTypes.object.isRequired,
  subjectGF: React.PropTypes.object.isRequired,
  gfEditUpdate: React.PropTypes.func.isRequired,
};
const mapState = (state) => ({
  subjectGF: gfEditGetSubject(state),
});
const mapDispatch = {
  gfEditUpdate,
};

const PureEditGF = pure(EditGF);

export default connect(mapState, mapDispatch)(PureEditGF);
