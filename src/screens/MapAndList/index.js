import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
// import TheMap from 'components/Map';
import PowerListContainer from 'components/PowerListContainer';
import ListBox from 'components/PowerListContainer/components/ListBox/';
import * as ListEvents from 'components/PowerListContainer/events';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';

const setUpHooksForMe = function (meThis) {
  return (inHook) => {
    meThis.hooks[ListEvents.LIST_ITEM_SELECTED] = inHook;
  };
};
const execHooksForMe = function (meThis) {
  return (hookId, id) => {
    meThis.hooks[hookId](id);
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
      <InnerPortal>
      <div className={styles.mapAndListContainer}>
        <PowerListContainer >
        { [{ title: 'Vehicles', element: <ListBox title="CAR" items={this.props.vehicles} hooks={execHooksForMe(this)} /> },
          { title: 'Locations', element: <ListBox title="GF" items={this.props.vehicles} hooks={execHooksForMe(this)} /> },
          { title: 'Drvrs', element: <ListBox title="DRIVER" items={this.props.vehicles} hooks={execHooksForMe(this)} /> }] }
        </PowerListContainer>
        <SplitContainer setUpHooks={setUpHooksForMe(this)} />
      </div>
      </InnerPortal>
    );
  }
}

// const PureMapAndList = pure(MapAndList);
// export default PureMapAndList;

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  locations: fromFleetReducer.getLocations(state),
});

MapAndList.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  locations: React.PropTypes.object.isRequired,
};

const PureMapAndList = pure(MapAndList);

export default connect(mapState)(PureMapAndList);
