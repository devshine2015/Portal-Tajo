import LocationEditPanel from 'containers/EditGFPanel';

// import * as listTypes from 'containers/PowerList/types';
import * as mapEvents from 'containers/MapFleet/events';
import * as locationEditEvents from 'containers/EditGFPanel/GFEditor/events';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
import InstancesColumn from 'containers/MapFleet/components/InstancesColumn';
import FixedContent from 'components/FixedContent';
// import * as fromFleetReducer from 'services/FleetModel/reducer';
import hooks from 'containers/MapFleet/hooks';

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
    const displayColumn = this.props.vehicles.length !== 0 &&
      this.props.locations.length !== 0 && this.state.mode === MD_LIST;

    return (
      <InnerPortal>
        <div className={styles.mapAndListContainer}>
          { displayColumn && (
            <InstancesColumn
              hooks={hooks.execHooksForMe(this)}
              setUpHooks={hooks.setUpHooksForMe(this)}
              locations={this.props.locations}
              vehicles={this.props.vehicles}
            />
          )}

          { this.state.mode !== MD_GF_EDIT ? null :
            <LocationEditPanel
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
  locations: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  locations: fromFleetReducer.getLocationsEx(state),
});

const PureMapFleetScreen = pure(MapFleetScreen);

export default connect(mapState)(PureMapFleetScreen);
