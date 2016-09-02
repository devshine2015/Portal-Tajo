import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import SplitContainer from 'containers/SplitContainer';
import GFEditPanel from 'containers/EditGFPanel';
import OperationalList from './components/OperationalPowerList';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import createEventDispatcher from 'utils/eventDispatcher';

import { MAP_GF_ADD } from 'containers/MapFleet/events';
import { OPS_LIST_EDIT_GF } from 'containers/Operational/components/OperationalPowerList/events';
import { GF_EDITOR_CLOSE } from 'containers/EditGFPanel/GFEditor/events';

import styles from './styles.css';

// mode
const MD_LIST = 'md_list';
const MD_GF_EDIT = 'md_gfedit';

class Operational extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: MD_LIST,
    };

    this.eventDispatcher = createEventDispatcher();

    this.eventDispatcher.registerHandler(MAP_GF_ADD, this.openGFEditor.bind(this));
    this.eventDispatcher.registerHandler(OPS_LIST_EDIT_GF, this.openGFEditor.bind(this));
    this.eventDispatcher.registerHandler(GF_EDITOR_CLOSE, this.closeGFEditor.bind(this));

    // helper obj for GF editor
    // TODO ?? move this to the store?
    this.subjGFContext = { obj: null };
  }

  openGFEditor(editFGCtx) {
    this.subjGFContext = { obj: editFGCtx.obj, pos: editFGCtx.pos };
    this.setState({ mode: MD_GF_EDIT });
  }
  closeGFEditor() {
    this.setState({ mode: MD_LIST });
  }

  render() {
    const displayColumn = this.props.vehicles.length !== 0 &&
      this.props.gfs.length !== 0 && this.state.mode === MD_LIST;

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
        { this.state.mode !== MD_GF_EDIT ? null :
          <GFEditPanel
            eventDispatcher={this.eventDispatcher}
            subjectContext={this.subjGFContext}
          />
        }
        <FixedContent containerClassName={styles.fixedContent}>
          <SplitContainer
            gfEditMode={this.state.mode === MD_GF_EDIT}
            eventDispatcher={this.eventDispatcher}
          />
        </FixedContent>
      </div>
    );
  }
}

Operational.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
});

const PureOperational = pure(Operational);

export default connect(mapState)(PureOperational);
