import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
import GFEditPanel from 'containers/EditGFPanel';
import InstancesColumn from 'containers/MapFleet/components/InstancesColumn';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import hooks from 'containers/MapFleet/hooks';

import { MAP_GF_ADD, LIST_GF_EDIT } from 'containers/MapFleet/events';
import * as gfEditEvents from 'containers/EditGFPanel/GFEditor/events';

import styles from './styles.css';

// mode
const MD_LIST = 'md_list';
const MD_GF_EDIT = 'md_gfedit';

class MapFleetScreen extends React.Component {

  constructor(props) {
    super(props);
    this.hooks = {};
    this.selectedListHook = null;
    this.state = {
      mode: MD_LIST,
    };

    this.addHook(MAP_GF_ADD, this.openGFEditor.bind(this));
    this.addHook(LIST_GF_EDIT, this.openGFEditor.bind(this));
    this.addHook(gfEditEvents.GF_EDITOR_CLOSE, this.closeGFEditor.bind(this));

    this.subjGFContext = { obj: null };
  }

  addHook(hookId, hookFunc) {
    console.log('hook++  '+ hookId + (this.hooks[hookId]===undefined ? ' add' : ' replace'));
    this.hooks[hookId] = hookFunc;
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
      <InnerPortal hasRealTimeData >
        <div className={styles.mapAndListContainer}>
          { displayColumn && (
            <InstancesColumn
              hooks={hooks.execHooksForMe(this)}
              setUpHooks={hooks.setUpHooksForMe(this)}
              locations={this.props.gfs}
              vehicles={this.props.vehicles}
            />
          )}

          { this.state.mode !== MD_GF_EDIT ? null :
            <GFEditPanel
              hooks={hooks.execHooksForMe(this)}
              setUpHooks={hooks.setUpHooksForMe(this)}
              subjectContext={this.subjGFContext}
            />
          }

          <FixedContent
            containerClassName={styles.fixedContent}
          >
            <SplitContainer
              gfEditMode={this.state.mode === MD_GF_EDIT}
              hooks={hooks.execHooksForMe(this)}
              setUpHooks={hooks.setUpHooksForMe(this)}
            />
          </FixedContent>
        </div>
      </InnerPortal>
    );
  }
}

MapFleetScreen.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  gfs: fromFleetReducer.getGFsEx(state),
});

const PureMapFleetScreen = pure(MapFleetScreen);

export default connect(mapState)(PureMapFleetScreen);
