//
// TODO: animated marker in/out (groe with bounce?)
//
import React from 'react';
import { connect } from 'react-redux';

import { contextActions } from 'services/Global/actions';
import { ctxGetSelectedVehicleId, ctxGetHideVehicles } from 'services/Global/reducers/contextReducer';

import LabelMarker from './LabelMarker';


// const shadow = require('assets/images/v_icons_combi/shadow.png');

require('containers/Map/leafletStyles.css');

class VehicleNameMarker extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.theVehicle.pos !== nextProps.theVehicle.pos
      || this.props.theVehicle.filteredOut !== nextProps.theVehicle.filteredOut
      || ((this.props.theVehicle.id === this.props.selectedVehicleId)
        ^ (nextProps.theVehicle.id === nextProps.selectedVehicleId));
  }

  clickHandle = () => {
    this.props.selectVehicle(this.props.theVehicle.id, true);
  }

  render() {
    return (
      <LabelMarker
        theMap={this.props.theMap}
        latLng={this.props.theVehicle.pos}
        label={this.props.theVehicle.original.name}
        isSelected={this.props.theVehicle.id === this.props.selectedVehicleId}
        onClick={this.clickHandle}
        hideMe={this.props.theVehicle.filteredOut || this.props.hideMe}
      />
    );
  }
}

VehicleNameMarker.propTypes = {
  theMap: React.PropTypes.object,
  theVehicle: React.PropTypes.object.isRequired,
  selectedVehicleId: React.PropTypes.string.isRequired,
  selectVehicle: React.PropTypes.func.isRequired,
  hideMe: React.PropTypes.bool.isRequired,
};

VehicleNameMarker.defaultProps = {
  theMap: null,
};

const mapState = (state) => ({
  selectedVehicleId: ctxGetSelectedVehicleId(state),
  hideMe: ctxGetHideVehicles(state),
});
const mapDispatch = {
  selectVehicle: contextActions.ctxSelectVehicle,
};

const CompleteVehicle = connect(mapState, mapDispatch)(VehicleNameMarker);

export const mapVehicleNameMaker = (v) => (
  <CompleteVehicle
    key={v.id}
    theMap={null}
    theVehicle={v}
  />
    );
