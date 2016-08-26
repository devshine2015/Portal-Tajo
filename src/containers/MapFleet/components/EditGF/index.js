import React from 'react';
import pure from 'recompose/pure';
import { NEW_GF_RADIUS } from 'utils/constants';
import * as editEvents from './events';
import * as editorEvents from 'containers/EditGFPanel/GFEditor/events';

class EditGF extends React.Component {
  constructor(props) {
    super(props);
    this.theLayer = null;
    this.theCircle = null;
    this.props.eventDispatcher.register(editorEvents.GF_EDITOR_RADIUS,
      ((meThis) => (newR) => { meThis.setRadius(newR); })(this));
  }

  componentDidMount() {
    this.theLayer = this.props.theLayer;

    this.theCircle = window.L.circle(this.props.spawnPos, NEW_GF_RADIUS);
    this.theCircle.editing.enable();
    this.theCircle.on('edit', () => {
//     const radius = Math.round(this.theCircle.getRadius());
      this.props.eventDispatcher.fireEvent(editEvents.MAP_EDITGF_SIZE, this.theCircle.getRadius());
      this.props.eventDispatcher.fireEvent(editEvents.MAP_EDITGF_MOVE, this.theCircle.getLatLng());
    });
    this.theLayer.addLayer(this.theCircle);
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
    this.setPosition(this.props.spawnPos);
    return false;
  }
}

EditGF.propTypes = {
  theLayer: React.PropTypes.object.isRequired,
  spawnPos: React.PropTypes.object.isRequired,
  eventDispatcher: React.PropTypes.object.isRequired,
};
const PureEditGF = pure(EditGF);

export default PureEditGF;
