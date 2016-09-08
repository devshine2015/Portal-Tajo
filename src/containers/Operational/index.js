import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
// import SplitContainer from 'containers/SplitContainer';
// import TheMap from 'containers/MapFleet';
import TheMap from 'containers/MapFleet';
import GFEditPanel from 'containers/EditGFPanel';
import OperationalList from './components/OperationalPowerList';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import createEventDispatcher from 'utils/eventDispatcher';
import { gfEditIsEditing } from 'containers/EditGFPanel/GFEditor/reducer';


import { MAP_GF_ADD } from 'containers/MapFleet/events';
import { OPS_LIST_EDIT_GF } from './components/OperationalPowerList/events';
import { GF_EDITOR_CLOSE } from 'containers/EditGFPanel/GFEditor/events';

import styles from './styles.css';


class Operational extends React.Component {

  constructor(props) {
    super(props);

    this.eventDispatcher = createEventDispatcher();

    // this.eventDispatcher.registerHandler(MAP_GF_ADD, this.openGFEditor.bind(this));
    // this.eventDispatcher.registerHandler(OPS_LIST_EDIT_GF, this.openGFEditor.bind(this));
    // this.eventDispatcher.registerHandler(GF_EDITOR_CLOSE, this.closeGFEditor.bind(this));

    // helper obj for GF editor
    // TODO ?? move this to the store?
    // this.subjGFContext = { obj: null };
  }

  // openGFEditor(editFGCtx) {
  //   this.subjGFContext = { obj: editFGCtx.obj, pos: editFGCtx.pos };
  //   this.setState({ mode: MD_GF_EDIT });
  // }
  // closeGFEditor() {
  //   this.setState({ mode: MD_LIST });
  // }

  render() {
    const displayColumn = this.props.vehicles.length !== 0 &&
      this.props.gfs.length !== 0 && !this.props.isEditGF;

    return (
      <div className={styles.mapAndListContainer}>
        { displayColumn && (
          <OperationalList
            eventDispatcher={this.eventDispatcher}
            gfs={this.props.gfs}
            vehicles={this.props.vehicles}
            // filteredVehicles={this.props.filteredVehicles}
            // filterFunc={this.props.filterFunc}
          />
        )}
        { !this.props.isEditGF ? null :
          <GFEditPanel />
        }
        <FixedContent containerClassName={styles.fixedContent}>
        <TheMap eventDispatcher={this.eventDispatcher}
          gfEditMode={this.props.isEditGF}
        />
        </FixedContent>
      </div>
    );
  }
}

Operational.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
  isEditGF: React.PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
  isEditGF: gfEditIsEditing(state),
});

const PureOperational = pure(Operational);

export default connect(mapState)(PureOperational);
