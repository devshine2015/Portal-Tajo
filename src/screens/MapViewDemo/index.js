import React from 'react';
import pure from 'recompose/pure';
import styles from 'screens/MapAndList/styles.css';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
// import TheMap from 'components/Map';
import PowerListContainer from 'containers/PowerList';
import * as ListTypes from 'containers/PowerList/types';
import ListBox from 'containers/PowerList/components/ListBox/';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';

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
  }

  render() {
    return (
      <InnerPortal showPortalsList={false}>
      <div className={styles.mapAndListContainer}>
        <PowerListContainer hooks={execHooksForMe(this)} setUpHooks={setUpHooksForMe(this)}>
        { [{ listType: ListTypes.LIST_VEHICLES, items: this.props.vehicles },
           { listType: ListTypes.LIST_LOCATIONS, items: this.props.locations }]
        }
        </PowerListContainer>
        <SplitContainer setUpHooks={setUpHooksForMe(this)} hooks={execHooksForMe(this)} />
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
