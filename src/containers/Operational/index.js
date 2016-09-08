import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
// import SplitContainer from 'containers/SplitContainer';
// import TheMap from 'containers/MapFleet';
import TheMap from 'containers/MapFleet';
import OperationalList from './components/OperationalPowerList';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import createEventDispatcher from 'utils/eventDispatcher';

import styles from './styles.css';


class Operational extends React.Component {

  constructor(props) {
    super(props);

    this.eventDispatcher = createEventDispatcher();
  }

  render() {
    // const displayColumn = this.props.vehicles.length !== 0 &&
    //   this.props.gfs.length !== 0 && !this.props.isEditGF;

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
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
});

const PureOperational = pure(Operational);
export default connect(mapState)(PureOperational);
