import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
import PowerListContainer from 'containers/PowerList';
import LocationEditPanel from 'containers/EditGFPanel';

import * as listTypes from 'containers/PowerList/types';
import * as mapEvents from 'containers/MapFleet/events';
import * as locationEditEvents from 'containers/EditGFPanel/GFEditor/events';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';

// mode
const MD_LIST = 'md_list';
const MD_GF_EDIT = 'md_gfedit';

const setUpHooksForMe = function (meThis) {
  return (hookId, inHook) => {
    meThis.hooks[hookId] = inHook;
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

    this.hooks[mapEvents.MAP_LOCATION_ADD] = this.openGFEditor.bind(this);
    this.hooks[locationEditEvents.GF_EDITOR_CLOSE] = this.closeGFEditor.bind(this);

    this.subjGFContext = { obj: null };
  }

  openGFEditor(editFGCtx) {
    this.subjGFContext = { obj: null, pos: editFGCtx.pos };
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
             { listType: listTypes.LIST_LOCATIONS, items: this.props.locations }]
          }
          </PowerListContainer>
        }
        { this.state.mode !== MD_GF_EDIT ? null :
          <LocationEditPanel
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
  locations: fromFleetReducer.getLocationsEx(state),
});

MapAndList.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  locations: React.PropTypes.array.isRequired,
};

const PureMapAndList = pure(MapAndList);

export default connect(mapState)(PureMapAndList);
