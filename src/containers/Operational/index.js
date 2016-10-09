import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
// import SplitContainer from 'containers/SplitContainer';
// import TheMap from 'containers/MapFleet';
import TheMap from 'containers/MapFleet/realTime';
import OperationalList from './components/OperationalPowerList';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { socketActions } from 'services/FleetModel/actions';
import createEventDispatcher from 'utils/eventDispatcher';

import ItemsList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import listTypes from 'components/InstancesList/types';

import styles from './styles.css';


class Operational extends React.Component {

  constructor(props) {
    super(props);

    this.eventDispatcher = createEventDispatcher();
  }

  componentWillUnmount() {
    socketActions.closeFleetSocket();
  }

  render() {
    // quick fix to make sure sockets are not opened before we have created local fleet model
    // if somebody else besides OPERATIONAL will be opening WS - lets move this to WS
    // (pendingOpen state)
    if (this.props.vehicles.length > 0 && !socketActions.isSocketOpened()) {
      this.props.openFleetSocket();
    }
// const theList = this.props.vehicles.map((aVeh)=>(<div key={aVeh.id}> {aVeh.name} </div>));
// return (
//   <div className={styles.mapAndListContainer}>
//     <PowerList>
//     {theList}
//     </PowerList>
//     <FixedContent containerClassName={styles.fixedContent}>
//     </FixedContent>
//   </div>
// );

    // return (
    //   <div className={styles.mapAndListContainer}>
    //     <PowerList>
    //     <ItemsList
    //       scrollIntoView
    //       data={this.props.vehicles}
    //       type={listTypes.withVehicleDetails}
    //     />
    //     </PowerList>
    //     <FixedContent containerClassName={styles.fixedContent}>
    //     </FixedContent>
    //   </div>
    // );
    return (
      <div className={styles.mapAndListContainer}>
          <OperationalList
            eventDispatcher={this.eventDispatcher}
            gfs={this.props.gfs}
            vehicles={this.props.vehicles}
            // filteredVehicles={this.props.filteredVehicles}
            // filterFunc={this.props.filterFunc}
          />
        <FixedContent containerClassName={styles.fixedContent}>
          <TheMap eventDispatcher={this.eventDispatcher} />
        </FixedContent>
      </div>
    );
  }
}

Operational.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
  openFleetSocket: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
});
const mapDispatch = {
  openFleetSocket: socketActions.openFleetSocket,
};

const PureOperational = pure(Operational);
export default connect(mapState, mapDispatch)(PureOperational);
