import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import TheMap from 'containers/MapFleet/realTime';
import OperationalList from './components/OperationalPowerList';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { socketActions } from 'services/FleetModel/actions';
import createEventDispatcher from 'utils/eventDispatcher';

import styles from './styles.css';


class Operational extends React.Component {

  constructor(props) {
    super(props);

    this.eventDispatcher = createEventDispatcher();
  }

  componentDidMount() {
    if (this.props.vehicles.length > 0) {
      this.props.openFleetSocket();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vehicles.length === 0 && nextProps.vehicles.length > 0) {
      this.props.openFleetSocket();
    }
  }

  componentWillUnmount() {
    socketActions.closeFleetSocket();
  }

  render() {
    return (
      <div className={styles.mapAndListContainer}>
          <OperationalList
            eventDispatcher={this.eventDispatcher}
            gfs={this.props.gfs}
            vehicles={this.props.vehicles}
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
