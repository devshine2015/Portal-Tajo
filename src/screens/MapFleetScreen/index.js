import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
import InstancesColumn from 'containers/MapFleet/components/InstancesColumn';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import hooks from 'containers/MapFleet/hooks';

import styles from './styles.css';

class MapFleetScreen extends React.Component {

  constructor(props) {
    super(props);

    this.hooks = {};
    this.selectedListHook = null;
  }

  render() {
    return (
      <InnerPortal>
        <div className={styles.mapAndListContainer}>
          <InstancesColumn
            hooks={hooks.execHooksForMe(this)}
            setUpHooks={hooks.setUpHooksForMe(this)}
            locations={this.props.locations}
            vehicles={this.props.vehicles}
          />
          <SplitContainer
            hooks={hooks.execHooksForMe(this)}
            setUpHooks={hooks.setUpHooksForMe(this)}
          />
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
