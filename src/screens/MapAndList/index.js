import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
import PowerListContainer from 'containers/PowerList';
import GFEditPanel from 'containers/EditGFPanel';

import * as listTypes from 'containers/PowerList/types';
import { MAP_GF_ADD } from 'containers/MapFleet/events';
import { LIST_GF_EDIT } from 'containers/PowerList/events';
import * as gfEditEvents from 'containers/EditGFPanel/GFEditor/events';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';

// mode
const MD_LIST = 'md_list';
const MD_GF_EDIT = 'md_gfedit';

const setUpHooksForMe = function (meThis) {
  return (hookId, inHook) => {
    meThis.addHook(hookId, inHook);
  };
};
const execHooksForMe = function (meThis) {
  return (hookId, id) => {
    if (meThis.hooks[hookId] !== undefined && meThis.hooks[hookId] !== null) {
      meThis.hooks[hookId](id);
    }
  };
};

class MapAndList extends React.Component {

  constructor(props) {
    super(props);
    this.hooks = {};
    this.selectedListHook = null;
    this.state = {
//      sidePanelMode: SMD_AREA_EDIT,
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
    return (
      <InnerPortal>
      <div className={styles.mapAndListContainer}>
        { this.state.mode !== MD_LIST ? null :
          <PowerListContainer hooks={execHooksForMe(this)} setUpHooks={setUpHooksForMe(this)}>
          { [{ listType: listTypes.LIST_VEHICLES, items: this.props.vehicles },
             { listType: listTypes.LIST_GF, items: this.props.gfs }]
          }
          </PowerListContainer>
        }
        { this.state.mode !== MD_GF_EDIT ? null :
          <GFEditPanel
            hooks={execHooksForMe(this)}
            setUpHooks={setUpHooksForMe(this)}
            subjectContext={this.subjGFContext}
          />
        }
        <SplitContainer
          setUpHooks={setUpHooksForMe(this)}
          hooks={execHooksForMe(this)}
          gfEditMode={this.state.mode === MD_GF_EDIT}
        />
      </div>
      </InnerPortal>
    );
  }
}


// const PureMapAndList = pure(MapAndList);
// export default PureMapAndList;

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  gfs: fromFleetReducer.getGFsEx(state),
});
MapAndList.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
};
const PureMapAndList = pure(MapAndList);

export default connect(mapState)(PureMapAndList);
